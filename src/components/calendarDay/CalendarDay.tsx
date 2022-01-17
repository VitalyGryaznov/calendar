import React from "react";
import Reminder from "../reminder/Reminder";
import { ReminderType, calendarDateFormat } from "../../types";
import dayjs from "dayjs";
import { useAppDispatch } from "../../redux/hooks";
import {
  setSelectedReminder,
  openReminderModal,
  setSelectedDate,
} from "../../redux/Slice";
import "./CalendarDay.scss";

function CalendarDay(props: any) {
  let dayFromCurrentMonth = props.dayFromCurrentMonth ? "": "day-inactive";
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setSelectedDate(props.day));
    dispatch(setSelectedReminder(null));
    dispatch(openReminderModal());
  };

  return (
    <li onClick={handleClick} className={`day ${dayFromCurrentMonth}`}>
      <div className="day_header" >
        {dayjs(props.day, calendarDateFormat).date()}
      </div>
      {props.reminders.map((reminder: ReminderType) => (
        <Reminder key={reminder.name + reminder.date} reminder={reminder}/>
      ))}
    </li>
  );
}

export default CalendarDay;
