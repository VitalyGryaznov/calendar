import React from "react";
import "./Reminder.scss";
import { reminderDateFormat } from "../../types";
import dayjs from "dayjs";
import { useAppDispatch } from "../../redux/hooks";
import { openReminderModal, setSelectedReminder } from "../../redux/Slice";

function Reminder(props: any) {
  const dispatch = useAppDispatch();
  const handleSelect = (e: any) => {
    dispatch(setSelectedReminder(props.reminder));
    dispatch(openReminderModal());
    e.stopPropagation();
  };

  return (
    <div className="reminder_container">
      <div className="reminder_content" onClick={handleSelect}>
        {`${dayjs(props.reminder.date, reminderDateFormat).format("h:m A")} ${
          props.reminder.name
        }`}
      </div>
    </div>
  );
}

export default Reminder;
