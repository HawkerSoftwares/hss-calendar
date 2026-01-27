import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HssCalendarComponent, HssCalendarEvent, HssCalendarConfig } from 'hss-calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HssCalendarComponent, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showAddForm = signal(false);
  isEditing = signal(false);
  editingEventId = signal<string | number | null>(null);
  newEvent = signal({
    title: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    color: '#3b82f6'
  });
  events = signal<HssCalendarEvent[]>([
    {
      id: 1,
      title: 'Project Kickoff',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
      backgroundColor: '#4caf50',
      textColor: '#fff'
    },
    {
      id: 2,
      title: 'Design Review',
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(new Date().setDate(new Date().getDate() + 1)),
      backgroundColor: '#2196f3',
      textColor: '#fff'
    }
  ]);

  config = signal<Partial<HssCalendarConfig>>({
    dark: false,
    locale: 'en-US',
    showOnlyEventsCount: true
  });

  selectedEvent = signal<HssCalendarEvent | null>(null);
  selectedDateEvents = signal<{ date: Date, events: HssCalendarEvent[] } | null>(null);

  onEventSelected(event: HssCalendarEvent) {
    this.selectedEvent.set(event);
  }

  onDateSelected(date: Date) {
    const eventsForDay = this.events().filter(e => {
      const eventDate = new Date(e.start);
      return eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate();
    });
    this.selectedDateEvents.set({ date, events: eventsForDay });
    this.selectedEvent.set(null); // Clear single event view when date is clicked
  }

  toggleAddForm() {
    this.showAddForm.update(v => !v);
    if (!this.showAddForm()) {
      this.resetForm();
    }
  }

  resetForm() {
    this.isEditing.set(false);
    this.editingEventId.set(null);
    this.newEvent.set({
      title: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      color: '#3b82f6'
    });
  }

  onStartDateChange() {
    this.newEvent.update(v => ({
      ...v,
      endDate: v.startDate
    }));
  }

  editEvent(event: HssCalendarEvent) {
    this.isEditing.set(true);
    this.editingEventId.set(event.id);
    this.newEvent.set({
      title: event.title,
      startDate: new Date(event.start).toISOString().split('T')[0],
      endDate: new Date(event.end).toISOString().split('T')[0],
      color: event.backgroundColor || '#3b82f6'
    });
    this.showAddForm.set(true);
  }

  deleteEvent(id: string | number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.events.update(e => e.filter(ev => ev.id !== id));
      if (this.selectedDateEvents()) {
        const date = this.selectedDateEvents()!.date;
        this.onDateSelected(date);
      }
    }
  }

  addEvent() {
    if (!this.newEvent().title) return;

    if (this.isEditing() && this.editingEventId() !== null) {
      this.events.update(e => e.map(ev => {
        if (ev.id === this.editingEventId()) {
          return {
            ...ev,
            title: this.newEvent().title,
            start: new Date(this.newEvent().startDate),
            end: new Date(this.newEvent().endDate),
            backgroundColor: this.newEvent().color
          };
        }
        return ev;
      }));
    } else {
      const event: HssCalendarEvent = {
        id: Date.now(),
        title: this.newEvent().title,
        start: new Date(this.newEvent().startDate),
        end: new Date(this.newEvent().endDate),
        backgroundColor: this.newEvent().color,
        textColor: '#fff'
      };
      this.events.update(e => [...e, event]);
    }

    this.showAddForm.set(false);
    this.resetForm();

    if (this.selectedDateEvents()) {
      this.onDateSelected(this.selectedDateEvents()!.date);
    }
  }

  toggleDark() {
    this.config.update(c => ({ ...c, dark: !c.dark }));
  }
}
