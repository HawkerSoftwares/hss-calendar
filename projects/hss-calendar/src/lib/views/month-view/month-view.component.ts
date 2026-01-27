import { Component, Input, Output, EventEmitter, computed, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HssCalendarStore } from '../../services/calendar.store';
import { HssDateUtils } from '../../utils/date-utils';
import { HssCalendarEvent } from '../../models/calendar.models';

@Component({
  selector: 'hss-month-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hss-month-grid">
      @for (day of weekDays(); track $index) {
        <div class="hss-weekday-header">{{ day }}</div>
      }
      
      @for (date of calendarGrid(); track date.getTime()) {
        <div 
          class="hss-day-cell" 
          [class.hss-today]="isToday(date)"
          [class.hss-other-month]="!isSameMonth(date)"
          (click)="onDateClick(date)"
        >
          @if (dayCellTemplate) {
            <ng-container [ngTemplateOutlet]="dayCellTemplate" [ngTemplateOutletContext]="{ $implicit: date }"></ng-container>
          } @else {
            <div class="hss-day-number">{{ date.getDate() }}</div>
            <div class="hss-events-container">
              @for (event of getEventsForDay(date); track event.id) {
                @if (eventTemplate) {
                  <ng-container [ngTemplateOutlet]="eventTemplate" [ngTemplateOutletContext]="{ $implicit: event }"></ng-container>
                } @else {
                  <div 
                    class="hss-event" 
                    [style.background-color]="event.backgroundColor"
                    [style.color]="event.textColor"
                    (click)="$event.stopPropagation(); onEventClick(event)"
                  >
                    {{ event.title }}
                  </div>
                }
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './month-view.component.scss'
})
export class HssMonthViewComponent {
  private readonly store = inject(HssCalendarStore);

  @Input() dayCellTemplate?: TemplateRef<any>;
  @Input() eventTemplate?: TemplateRef<any>;

  @Output() eventClick = new EventEmitter<HssCalendarEvent>();
  @Output() dateClick = new EventEmitter<Date>();

  calendarGrid = computed(() => {
    return HssDateUtils.getMonthGrid(
      this.store.currentDate(),
      this.store.config().weekStartsOn
    );
  });

  weekDays = computed(() => {
    const locale = this.store.config().locale || 'en-US';
    const baseDate = HssDateUtils.startOfWeek(new Date(), this.store.config().weekStartsOn);
    return Array.from({ length: 7 }).map((_, i) => {
      const date = HssDateUtils.addDays(baseDate, i);
      return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
    });
  });

  isToday(date: Date): boolean {
    return HssDateUtils.isSameDay(date, new Date());
  }

  isSameMonth(date: Date): boolean {
    return date.getMonth() === this.store.currentDate().getMonth();
  }

  onDateClick(date: Date) {
    this.dateClick.emit(date);
  }

  getEventsForDay(date: Date): HssCalendarEvent[] {
    return this.store.events().filter(event =>
      HssDateUtils.isSameDay(new Date(event.start), date)
    );
  }

  onEventClick(event: HssCalendarEvent) {
    this.eventClick.emit(event);
  }
}
