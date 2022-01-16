import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import dayjs, { Dayjs } from "dayjs";
import { CalendarStateType, ReminderType } from "../types";

const initialState: CalendarStateType = {
  selectedDay: null,
  selectedReminder: null,
  selectedMonth: dayjs().month(),
  selectedYear: dayjs().year(),
  showReminderModal: false,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    incrementMonth: (state) => {
      state.selectedMonth += 1;
    },
    decrementMonth: (state) => {
      state.selectedMonth -= 1;
    },
    setSelectedDate: (state, action: PayloadAction<Dayjs | null>) => {
        state.selectedDay = action.payload;
    },
    setSelectedReminder: (state, action: PayloadAction<ReminderType | null>) => {
        console.log(action.payload);
        state.selectedReminder = action.payload;
    },
    closeReminderModal: (state) => {
        state.showReminderModal = false;
    },
    openReminderModal: (state) => {
        state.showReminderModal = true;
    },
  },
});

export const { incrementMonth, decrementMonth, setSelectedDate, closeReminderModal, setSelectedReminder, openReminderModal } = calendarSlice.actions;

export const selectMonth = (state: RootState) => state.calendar.selectedMonth;
export const selectYear = (state: RootState) => state.calendar.selectedYear;
export const selectReminder = (state: RootState) => state.calendar.selectedReminder;
export const selectShowReminderModal = (state: RootState) => state.calendar.showReminderModal;
export const selectDay = (state: RootState) => state.calendar.selectedDay;

export default calendarSlice.reducer;