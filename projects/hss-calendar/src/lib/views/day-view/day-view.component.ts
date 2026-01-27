import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HssCalendarStore } from '../../services/calendar.store';
import { HssDateUtils } from '../../utils/date-utils';
import { HssCalendarEvent } from '../../models/calendar.models';

@Component({
    selector: 'hss-day-view',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="hss-day-container">
      <div class="hss-time-column">
        <div class="hss-time-header"></div>
        @for (hour of hours; track hour) {
          <div class="hss-time-slot">{{ hour }}:00</div>
        }
      </div>
      
      <div class="hss-content-container">
        <div class="hss-day-header">
          <div class="hss-day-info">
            <span class="day-name">{{ dayInfo().name }}</span>
            <span class="day-number" [class.hss-today]="dayInfo().isToday">{{ dayInfo().date.getDate() }}</span>
          </div>
        </div>
        
        <div class="hss-grid-container">
          <div class="hss-day-column">
            @for (hour of hours; track hour) {
              <div class="hss-grid-slot"></div>
            }
            
            <div class="hss-events-overlay">
              @for (event of dayEvents(); track event.id) {
                <div 
                  class="hss-event" 
                  [style.background-color]="event.backgroundColor"
                  [style.color]="event.textColor"
                  [style.top.px]="getEventTop(event)"
                  [style.height.px]="getEventHeight(event)"
                >
                  <div class="event-title">{{ event.title }}</div>
                  <div class="event-time">{{ event.start | date:'shortTime' }} - {{ event.end | date:'shortTime' }}</div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styleUrl: './day-view.component.scss'
})
export class HssDayViewComponent {
    private readonly store = inject(HssCalendarStore);
    hours = Array.from({ length: 24 }, (_, i) => i);

    dayInfo = computed(() => {
        const locale = this.store.config().locale || 'en-US';
        const date = this.store.currentDate();
        return {
            date,
            name: new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date),
            isToday: HssDateUtils.isSameDay(date, new Date())
        };
    });

    dayEvents = computed(() => {
        return this.store.events().filter(event =>
            HssDateUtils.isSameDay(new Date(event.start), this.store.currentDate()) && !event.allDay
        );
    });

    getEventTop(event: HssCalendarEvent): number {
        const start = new Date(event.start);
        return (start.getHours() * 60 + start.getMinutes());
    }

    getEventHeight(event: HssCalendarEvent): number {
        const start = new Date(event.start);
        const end = new Date(event.end);
        const diffMs = end.getTime() - start.getTime();
        return (diffMs / (1000 * 60));
    }
}
