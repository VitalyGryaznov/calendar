import { Dayjs } from "dayjs";

export interface CalendarState {
    selectedDay: Dayjs | null;
    selectedReminder: ReminderType | null;
    selectedMonth: number;
    selectedYear: number;
    showReminderModal: boolean;
}

export interface ReminderType {
    id: number;
    name: string;
    date: Dayjs;
}

export interface DayAndRemindeer {
    day: Dayjs;
    reminders: Array<ReminderType>
}