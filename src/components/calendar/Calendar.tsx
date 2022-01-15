import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "./Calendar.scss";
import CalendarDay from "../calendarDay/CalendarDay";
import ModalDialog from "../modalDialog/modalDialog";
import CalendarNavigation from "../calendarNavigation/CalendarNavigation";
import {
  getDaysFromTheCurrentMonth,
  getDaysFromThePreviousMonthAtTheFirstWeekOfTheCurrentMonth,
  getDaysFromTheNextMonthAtTheLastWeekOfTheCurrentMonth,
} from "../../utils/dateUtils";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectYear, selectMonth } from "../../redux/Slice";
import { getReminders } from "../../api/remindersApi";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { DayAndRemindeer, ReminderType } from "../../types";

function Calendar() {
  const selectedMonth = useAppSelector(selectMonth);
  const selectedYear = useAppSelector(selectYear);

  const daysInCurrentMonth = getDaysFromTheCurrentMonth(
    selectedYear,
    selectedMonth
  );

  const daysInTheWeekBeforeTheFirst =
    getDaysFromThePreviousMonthAtTheFirstWeekOfTheCurrentMonth(
      selectedYear,
      selectedMonth
    );
  const daysInTheLastWeekAfterTheLastDay =
    getDaysFromTheNextMonthAtTheLastWeekOfTheCurrentMonth(
      selectedYear,
      selectedMonth
    );

  const onCreate = (payload: any) => {
    console.log(payload);
  };

  const { data, isLoading, isError, error } = useQuery(
    "reminders",
    getReminders
  );

  const DatesInCalendar = () => {
    if (isLoading) {
      return <CircularProgress />;
    }
    if (isError) {
      return <div>Something went wrong</div>;
    }

    const addremindersToDatesList = (
      daysList: Array<Dayjs>
    ): Array<DayAndRemindeer> => {
      return daysList.map((day) => {
        return {
          day: day,
          reminders: data?.filter(
            (reminder: any) =>
              reminder.date.substring(0, 10) === day.format("YYYY-MM-DD")
          ).map((reminder: any) => { return {...reminder, date: dayjs(reminder.date, "YYYY-MM-DDTHH:mm:ss")}})
        };
      });
    };

    const daysAndRemindersInCurrentMonth =
      addremindersToDatesList(daysInCurrentMonth);
    const daysAndRemindersInTheWeekBeforeTheFirst = addremindersToDatesList(
      daysInTheWeekBeforeTheFirst
    );
    const daysAndRemindersInTheLastWeekAfterTheLastDay =
      addremindersToDatesList(daysInTheLastWeekAfterTheLastDay);

    return (
      <ol className="day-grid">
        {daysAndRemindersInTheWeekBeforeTheFirst.map((dayAndReminders) => (
          <CalendarDay
            className="month=prev"
            day={dayAndReminders.day}
            key={dayAndReminders.day.format("DDMM")}
            reminders={dayAndReminders.reminders}
          ></CalendarDay>
        ))}
        {daysAndRemindersInCurrentMonth.map((dayAndReminders) => (
          <CalendarDay
            day={dayAndReminders.day}
            reminders={dayAndReminders.reminders}
            key={dayAndReminders.day.format("DDMM")}
          ></CalendarDay>
        ))}
        {daysAndRemindersInTheLastWeekAfterTheLastDay.map((dayAndReminders) => (
          <CalendarDay
            className="month=prev"
            day={dayAndReminders.day}
            key={dayAndReminders.day.format("DDMM")}
            reminders={dayAndReminders.reminders}
          ></CalendarDay>
        ))}
      </ol>
    );
  };

  return (
    <div>
      <ModalDialog onCreate={onCreate}></ModalDialog>
      <CalendarNavigation></CalendarNavigation>
      <ul className="weekdays">
        <li>
          <abbr title="S">Sunday</abbr>
        </li>
        <li>
          <abbr title="M">Monday</abbr>
        </li>
        <li>
          <abbr title="T">Tuesday</abbr>
        </li>
        <li>
          <abbr title="W">Wednesday</abbr>
        </li>
        <li>
          <abbr title="T">Thursday</abbr>
        </li>
        <li>
          <abbr title="F">Friday</abbr>
        </li>
        <li>
          <abbr title="S">Saturday</abbr>
        </li>
      </ul>
      <DatesInCalendar></DatesInCalendar>
    </div>
  );
}

export default Calendar;
