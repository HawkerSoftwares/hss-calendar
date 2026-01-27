export type HssCalendarView = 'month' | 'week' | 'day';

export interface HssCalendarEvent<T = any> {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  className?: string | string[];
  meta?: T;
}

export interface HssCalendarConfig {
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 for Sunday, 1 for Monday, etc.
  showHeader?: boolean;
  dark?: boolean;
  showOnlyEventsCount?: boolean;
}

export interface HssCalendarState {
  view: HssCalendarView;
  currentDate: Date;
  events: HssCalendarEvent[];
  config: HssCalendarConfig;
}
