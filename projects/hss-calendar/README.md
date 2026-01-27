<div align="center">
  <a href="https://brainzo.fun">
    <img src="https://raw.githubusercontent.com/HawkerSoftwares/hss-calendar/main/projects/demo/screenshots/brainzo_banner.png" width="600" alt="Brainzo - Kids Learning App">
  </a>
  <p>
    <strong>Looking for a fun way for kids to learn?</strong><br>
    Check out <a href="https://brainzo.fun">Brainzo.fun</a> - The ultimate kids learning app for ages 4-15!<br>
    <i>Quizzes • Puzzles • Alphabet Games • Number Activities • Offline Support</i>
  </p>
</div>

---

# hss-calendar

A lightweight, fully customizable, responsive, and Angular-native calendar library for Angular 17+.

## 🚀 Recent Updates
- **Multi-day Events**: Full support for start and end dates.
- **Improved Views**: Enhanced Week and Day views with sticky headers and better scroll performance.
- **Event Badges**: New compact badge mode for Month view to avoid clutter.
- **Premium Themes**: Refined Light and Dark mode variables for a high-end dashboard feel.

## 📦 Features

- 📅 **View Modes**: High-performance Month, Week, and Day views.
- 🎨 **Templates**: Use `#dayCellTemplate` and `#eventTemplate` for total UI control.
- 🌓 **Theming**: Dark mode support via CSS variables.
- ⚡ **Signals**: Built using the latest Angular Signals for modern reactive state.
- 📱 **Responsive**: Mobile-first design for a seamless cross-device experience.

## 🛠 Installation

```bash
npm install hss-calendar
```

## 📖 Basic Usage

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
  events = signal<HssCalendarEvent[]>([
    {
      id: 1,
      title: 'Project Launch',
      start: new Date('2026-01-27'),
      end: new Date('2026-01-28'),
      backgroundColor: '#1976d2'
    }
  ]);

  config = {
    dark: false,
    locale: 'en-US',
    showOnlyEventsCount: false // Set to true for badge mode
  };

  onEventSelected(event: HssCalendarEvent) {
    console.log('Selected:', event.title);
  }

  onDateSelected(date: Date) {
    console.log('Selected Date:', date);
  }
}
```

## 🎨 Advanced Customization

### Theming
Override variables in your `global.scss` or `styles.css`:

```scss
:root {
  --hss-calendar-bg: #ffffff;
  --hss-calendar-border: #e2e8f0;
  --hss-calendar-today-text: #1976d2;
  /* Dark mode overrides */
  &[data-theme='dark'] {
    --hss-calendar-bg: #0f172a;
  }
}
```

### Templates
```html
<hss-calendar [events]="events">
  <ng-template #eventTemplate let-event>
    <div class="my-event-card">
      📍 {{ event.title }}
    </div>
  </ng-template>
</hss-calendar>
```

## 📋 API Reference

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `events` | `HssCalendarEvent[]` | `[]` | Array of event objects |
| `view` | `'month' \| 'week' \| 'day'` | `'month'` | Current calendar view |
| `config` | `Partial<HssCalendarConfig>` | `{}` | Settings (locale, dark, showOnlyEventsCount, etc.) |

### Outputs
| Event | Type | Description |
| :--- | :--- | :--- |
| `eventClicked` | `EventEmitter<HssCalendarEvent>` | Emits when an event block is clicked |
| `dateClicked` | `EventEmitter<Date>` | Emits when a day cell is clicked |
| `viewChanged` | `EventEmitter<HssCalendarView>` | Emits when the user switches view mode |

---

Developed by **Hawker Team**.
