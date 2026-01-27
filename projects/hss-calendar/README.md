# hss-calendar

A lightweight, fully customizable, responsive, and Angular-native calendar library for Angular 17+.

## Features

- 📅 **Month, Week, and Day Views**: Switch between views at runtime.
- 🎨 **100% Customizable**: Override header, day cells, and events via `ng-template`.
- 🌓 **Theming**: Built-in support for Light and Dark modes using CSS variables.
- ⚡ **Performance**: Standalone components and Angular Signals for reactive state management.
- 📱 **Responsive**: Mobile-first design that adapts to all screen sizes.
- ⌨️ **Accessible**: Proper ARIA support for enterprise-grade apps.

## Installation

```bash
npm install hss-calendar
```

## Usage

1. **Import the component**:

```typescript
import { HssCalendarComponent } from 'hss-calendar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HssCalendarComponent],
  template: `
    <hss-calendar 
      [events]="events" 
      [config]="config"
      (eventClicked)="onEventSelected($event)"
      (dateClicked)="onDateSelected($event)"
    ></hss-calendar>
  `
})
export class AppComponent {
  events = [
    {
      id: 1,
      title: 'Success Meeting',
      start: new Date(),
      end: new Date(),
      backgroundColor: '#4caf50'
    }
  ];

  config = {
    dark: false,
    locale: 'en-US'
  };

  onEventSelected(event: any) {
    console.log('Event clicked:', event);
  }

  onDateSelected(date: Date) {
    console.log('Date clicked:', date);
  }
}
```

## Custom Templates

You can customize the look of the calendar using named templates:

```html
<hss-calendar [events]="events">
  <!-- Custom Header -->
  <ng-template #headerTemplate>
    <div class="custom-header">My Custom Header</div>
  </ng-template>

  <!-- Custom Day Cell -->
  <ng-template #dayCellTemplate let-date>
    <div class="custom-day">{{ date | date:'d' }}</div>
  </ng-template>

  <!-- Custom Event UI -->
  <ng-template #eventTemplate let-event>
    <div class="custom-event">🚀 {{ event.title }}</div>
  </ng-template>
</hss-calendar>
```

## Theming

hss-calendar uses CSS variables for theming. You can override them in your global styles:

```css
:root {
  --hss-calendar-bg: #ffffff;
  --hss-calendar-text: #333333;
  --hss-calendar-event-bg: #1976d2;
  /* ... more variables available in src/lib/styles/_variables.scss */
}
```

## API

### Inputs

| Input | Type | Description |
|-------|------|-------------|
| `view` | `'month' \| 'week' \| 'day'` | Current view mode (default: `'month'`) |
| `events` | `HssCalendarEvent[]` | List of events to display |
| `config` | `Partial<HssCalendarConfig>` | Calendar configuration (locale, dark mode, etc.) |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `viewChanged` | `EventEmitter<HssCalendarView>` | Fired when the view mode changes |
| `dateClicked` | `EventEmitter<Date>` | Fired when a date cell is clicked |
| `eventClicked` | `EventEmitter<HssCalendarEvent>` | Fired when an event is clicked |

## Credits

Developed by the Hawker Team.
