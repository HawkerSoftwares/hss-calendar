import { Injectable, computed, signal } from '@angular/core';
import { HssCalendarEvent, HssCalendarState, HssCalendarView, HssCalendarConfig } from '../models/calendar.models';

@Injectable()
export class HssCalendarStore {
    private readonly _state = signal<HssCalendarState>({
        view: 'month',
        currentDate: new Date(),
        events: [],
        config: {
            locale: 'en-US',
            weekStartsOn: 0,
            showHeader: true,
            dark: false,
            showOnlyEventsCount: false
        }
    });

    // Selectors
    readonly view = computed(() => this._state().view);
    readonly currentDate = computed(() => this._state().currentDate);
    readonly events = computed(() => this._state().events);
    readonly config = computed(() => this._state().config);

    // Actions
    setView(view: HssCalendarView) {
        this._state.update(state => ({ ...state, view }));
    }

    setCurrentDate(date: Date) {
        this._state.update(state => ({ ...state, currentDate: date }));
    }

    setEvents(events: HssCalendarEvent[]) {
        this._state.update(state => ({ ...state, events }));
    }

    updateConfig(config: Partial<HssCalendarConfig>) {
        this._state.update(state => ({
            ...state,
            config: { ...state.config, ...config }
        }));
    }

    next() {
        const { view, currentDate } = this._state();
        const nextDate = new Date(currentDate);
        if (view === 'month') {
            nextDate.setMonth(nextDate.getMonth() + 1);
        } else if (view === 'week') {
            nextDate.setDate(nextDate.getDate() + 7);
        } else {
            nextDate.setDate(nextDate.getDate() + 1);
        }
        this.setCurrentDate(nextDate);
    }

    prev() {
        const { view, currentDate } = this._state();
        const prevDate = new Date(currentDate);
        if (view === 'month') {
            prevDate.setMonth(prevDate.getMonth() - 1);
        } else if (view === 'week') {
            prevDate.setDate(prevDate.getDate() - 7);
        } else {
            prevDate.setDate(prevDate.getDate() - 1);
        }
        this.setCurrentDate(prevDate);
    }

    today() {
        this.setCurrentDate(new Date());
    }
}
