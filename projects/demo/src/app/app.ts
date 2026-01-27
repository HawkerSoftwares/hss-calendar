import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HssCalendarComponent, HssCalendarEvent, HssCalendarConfig } from 'hss-calendar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HssCalendarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
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
    locale: 'en-US'
  });

  selectedEvent = signal<HssCalendarEvent | null>(null);

  onEventSelected(event: HssCalendarEvent) {
    this.selectedEvent.set(event);
  }

  onDateSelected(date: Date) {
    console.log('Date selected:', date);
  }

  toggleDark() {
    this.config.update(c => ({ ...c, dark: !c.dark }));
  }
}
