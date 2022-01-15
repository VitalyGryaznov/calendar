import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import dayjs, { Dayjs } from "dayjs";
import { CalendarState } from "../types";

const initialState: CalendarState = {
  selectedDay: null,
  selectedReminder: null,
  selectedMonth: dayjs().month(),
  selectedYear: dayjs().year(),
  showReminderModal: true,
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
    closeReminderModal: (state) => {
        console.log("REducer works");
        state.showReminderModal = false;
    },
  },
});

export const { incrementMonth, decrementMonth, setSelectedDate, closeReminderModal } = calendarSlice.actions;

export const selectMonth = (state: RootState) => state.calendar.selectedMonth;
export const selectYear = (state: RootState) => state.calendar.selectedYear;
export const selectReminder = (state: RootState) => state.calendar.selectedReminder;
export const selectShowReminderModal = (state: RootState) => state.calendar.showReminderModal

export default calendarSlice.reducer;