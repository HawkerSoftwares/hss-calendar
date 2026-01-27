export class HssDateUtils {
    static startOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    static endOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

    static startOfWeek(date: Date, weekStartsOn: number = 0): Date {
        const d = new Date(date);
        const day = d.getDay();
        const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
        d.setDate(d.getDate() - diff);
        d.setHours(0, 0, 0, 0);
        return d;
    }

    static endOfWeek(date: Date, weekStartsOn: number = 0): Date {
        const d = this.startOfWeek(date, weekStartsOn);
        d.setDate(d.getDate() + 6);
        d.setHours(23, 59, 59, 999);
        return d;
    }

    static addDays(date: Date, days: number): Date {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    }

    static addMonths(date: Date, months: number): Date {
        const d = new Date(date);
        d.setMonth(d.getMonth() + months);
        return d;
    }

    static isSameDay(d1: Date, d2: Date): boolean {
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    }

    static getDaysInMonth(date: Date): Date[] {
        const start = this.startOfMonth(date);
        const end = this.endOfMonth(date);
        const days: Date[] = [];
        const current = new Date(start);
        while (current <= end) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        return days;
    }

    static getMonthGrid(date: Date, weekStartsOn: number = 0): Date[] {
        const start = this.startOfMonth(date);
        const gridStart = this.startOfWeek(start, weekStartsOn);
        const grid: Date[] = [];
        const current = new Date(gridStart);

        // Grid always has 42 days (6 weeks) to maintain consistent height
        for (let i = 0; i < 42; i++) {
            grid.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        return grid;
    }
}
