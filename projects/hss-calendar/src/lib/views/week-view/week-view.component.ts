import { Component, Input, Output, EventEmitter, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HssCalendarStore } from '../../services/calendar.store';
import { HssDateUtils } from '../../utils/date-utils';
import { HssCalendarEvent } from '../../models/calendar.models';

@Component({
  selector: 'hss-week-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hss-week-container">
      <div class="hss-time-column">
        <div class="hss-time-header"></div>
        <div class="hss-time-slots-container">
          @for (hour of hours; track hour) {
            <div class="hss-time-slot">{{ hour }}:00</div>
          }
        </div>
      </div>
      
      <div class="hss-days-container">
        <div class="hss-days-header">
          @for (day of weekDays(); track $index) {
            <div class="hss-day-column-header" (click)="onDateClick(day.date)">
              <span class="day-name">{{ day.name }}</span>
              <span class="day-number" [class.hss-today]="day.isToday">{{ day.date.getDate() }}</span>
            </div>
          }
        </div>
        
        <div class="hss-grid-scroll-area">
          <div class="hss-grid-container">
            @for (day of weekDays(); track $index) {
              <div class="hss-day-column" (click)="onDateClick(day.date)">
                @for (hour of hours; track hour) {
                  <div class="hss-grid-slot"></div>
                }
                
                <div class="hss-events-overlay">
                  @for (event of getEventsForDay(day.date); track event.id) {
                    <div 
                      class="hss-event" 
                      [style.background-color]="event.backgroundColor"
                      [style.color]="event.textColor"
                      [style.top.px]="getEventTop(event)"
                      [style.height.px]="getEventHeight(event)"
                      (click)="$event.stopPropagation(); onEventClick(event)"
                    >
                      <div class="event-title">{{ event.title }}</div>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './week-view.component.scss'
})
export class HssWeekViewComponent {
  private readonly store = inject(HssCalendarStore);

  @Output() eventClick = new EventEmitter<HssCalendarEvent>();
  @Output() dateClick = new EventEmitter<Date>();

  hours = Array.from({ length: 24 }, (_, i) => i);

  weekDays = computed(() => {
    const locale = this.store.config().locale || 'en-US';
    const start = HssDateUtils.startOfWeek(this.store.currentDate(), this.store.config().weekStartsOn);

    return Array.from({ length: 7 }).map((_, i) => {
      const date = HssDateUtils.addDays(start, i);
      return {
        date,
        name: new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date),
        isToday: HssDateUtils.isSameDay(date, new Date())
      };
    });
  });

  getEventsForDay(date: Date): HssCalendarEvent[] {
    return this.store.events().filter(event =>
      HssDateUtils.isSameDay(new Date(event.start), date) && !event.allDay
    );
  }

  getEventTop(event: HssCalendarEvent): number {
    const start = new Date(event.start);
    return (start.getHours() * 60 + start.getMinutes());
  }

  getEventHeight(event: HssCalendarEvent): number {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const diffMs = end.getTime() - start.getTime();
    const height = (diffMs / (1000 * 60));
    return Math.max(height, 25); // Minimum height of 25px
  }

  onEventClick(event: HssCalendarEvent) {
    this.eventClick.emit(event);
  }

  onDateClick(date: Date) {
    this.dateClick.emit(date);
  }
}
