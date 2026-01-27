import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
  signal,
  effect,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HssCalendarStore } from './services/calendar.store';
import { HssCalendarView, HssCalendarEvent, HssCalendarConfig } from './models/calendar.models';
import { HssMonthViewComponent } from './views/month-view/month-view.component';
import { HssWeekViewComponent } from './views/week-view/week-view.component';
import { HssDayViewComponent } from './views/day-view/day-view.component';

@Component({
  selector: 'hss-calendar',
  standalone: true,
  imports: [CommonModule, HssMonthViewComponent, HssWeekViewComponent, HssDayViewComponent],
  providers: [HssCalendarStore],
  template: `
    <div class="hss-calendar-container calendar-{{viewState()}}-view" [attr.data-theme]="configState().dark ? 'dark' : 'light'">
      <!-- Header -->
      <div class="hss-calendar-header">
        <div class="hss-calendar-controls">
          <button (click)="store.prev()" class="hss-btn">&lt;</button>
          <button (click)="store.today()" class="hss-btn">Today</button>
          <button (click)="store.next()" class="hss-btn">&gt;</button>
        </div>
        
        <h2 class="hss-calendar-title">{{ calendarTitle() }}</h2>
        
        <div class="hss-view-switcher">
          <button 
            [class.active]="viewState() === 'month'" 
            (click)="store.setView('month')" 
            class="hss-btn"
          >Month</button>
          <button 
            [class.active]="viewState() === 'week'" 
            (click)="store.setView('week')" 
            class="hss-btn"
          >Week</button>
          <button 
            [class.active]="viewState() === 'day'" 
            (click)="store.setView('day')" 
            class="hss-btn"
          >Day</button>
        </div>
      </div>

      <!-- View Content -->
      <div class="hss-calendar-body">
        @switch (viewState()) {
          @case ('month') {
            <hss-month-view 
              [dayCellTemplate]="dayCellTemplate" 
              [eventTemplate]="eventTemplate"
              (eventClick)="onEventClick($event)"
              (dateClick)="onDateClick($event)"
            ></hss-month-view>
          }
          @case ('week') {
            <hss-week-view></hss-week-view>
          }
          @case ('day') {
            <hss-day-view></hss-day-view>
          }
        }
      </div>
    </div>
  `,
  styleUrl: './hss-calendar.component.scss'
})
export class HssCalendarComponent implements OnInit {
  readonly store = inject(HssCalendarStore);

  @Input() set view(val: HssCalendarView) { this.store.setView(val); }
  @Input() set events(val: HssCalendarEvent[]) { this.store.setEvents(val); }
  @Input() set config(val: Partial<HssCalendarConfig>) { this.store.updateConfig(val); }

  @Output() viewChanged = new EventEmitter<HssCalendarView>();
  @Output() dateClicked = new EventEmitter<Date>();
  @Output() eventClicked = new EventEmitter<HssCalendarEvent>();

  @ContentChild('headerTemplate') headerTemplate?: TemplateRef<any>;
  @ContentChild('dayCellTemplate') dayCellTemplate?: TemplateRef<any>;
  @ContentChild('eventTemplate') eventTemplate?: TemplateRef<any>;

  viewState = this.store.view;
  currentDate = this.store.currentDate;
  configState = this.store.config;

  calendarTitle = signal('');

  constructor() {
    effect(() => {
      const date = this.currentDate();
      const locale = this.configState().locale || 'en-US';
      const formatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
      this.calendarTitle.set(formatter.format(date));
    });
  }

  ngOnInit() {
    // Initial sync if needed
  }

  onEventClick(event: HssCalendarEvent) {
    this.eventClicked.emit(event);
  }

  onDateClick(date: Date) {
    this.dateClicked.emit(date);
  }
}
