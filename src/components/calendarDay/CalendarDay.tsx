import React from 'react';
import Reminder from '../reminder/Reminder';
import { ReminderType, calendarDateFormat } from "../../types";
import dayjs from 'dayjs';
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  selectYear,
  selectMonth,
  selectReminder,
  setSelectedReminder,
  openReminderModal,
  setSelectedDate,
} from "../../redux/Slice";

function CalendarDay(props: any) {
    let isDayActive = "calendarDay_header-activeDay";
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setSelectedDate(props.day));
        dispatch(setSelectedReminder(null));
        dispatch(openReminderModal());
      };
    
 
    return (
        <li onClick={handleClick}>
            <h2 className={`calendarDay_header ${isDayActive}`}>{dayjs(props.day, calendarDateFormat).date()}</h2>
            {props.reminders.map((reminder: ReminderType) => <Reminder key={reminder.name + reminder.date} reminder={reminder}> </Reminder>)}
            
        </li>
    )
}

export default CalendarDay
