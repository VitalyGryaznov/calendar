import { Dayjs } from "dayjs";

export const reminderDateFormat = "YYYY-MM-DDTHH:mm:ss";

export const calendarDateFormat = "YYYY-MM-DD";

export interface CalendarStateType {
    selectedDay: Dayjs | null;
    selectedReminder: ReminderType | null;
    selectedMonth: number;
    selectedYear: number;
    showReminderModal: boolean;
}

export interface ReminderType {
    id: number;
    name: string;
    date: string;
}

export interface DayAndRemindeer {
    day: string;
    reminders: Array<ReminderType>
}