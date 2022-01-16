import React from "react";
import "./Reminder.scss";
import { ReminderType, reminderDateFormat } from "../../types";
import dayjs from "dayjs";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  selectYear,
  selectMonth,
  selectReminder,
  selectShowReminderModal,
  openReminderModal,
  setSelectedReminder,
} from "../../redux/Slice";

function Reminder(props: any) {
  const dispatch = useAppDispatch();
  const handleSelect = (e: any) => {
    dispatch(setSelectedReminder(props.reminder));
    dispatch(openReminderModal());
    e.stopPropagation();
  };


  return (
    <>
      <div className="reminder" onClick={handleSelect}>
        {`${dayjs(props.reminder.date, reminderDateFormat).format("h:m A")} ${
          props.reminder.name
        }`}
      </div>
    
    </>
  );
}

export default Reminder;
