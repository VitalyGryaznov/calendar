import dayjs, { Dayjs } from "dayjs";
import "./Calendar.scss";
import CalendarDay from "../calendarDay/CalendarDay";

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
import { DayAndRemindeer } from "../../types";

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

  const { data, isLoading, isError } = useQuery("reminders", getReminders);

  const DatesInCalendar = () => {
    if (isLoading) {
      return <CircularProgress />;
    }
    if (isError) {
      return <div>Something went wrong</div>;
    }

    const addremindersToDatesList = (
      daysList: Array<string>
    ): Array<DayAndRemindeer> => {
      return daysList.map((day) => {
        return {
          day: day,
          reminders: data?.filter(
            (reminder: any) => reminder.date.substring(0, 10) === day
          ),
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
            key={dayAndReminders.day}
            reminders={dayAndReminders.reminders}
          ></CalendarDay>
        ))}
        {daysAndRemindersInCurrentMonth.map((dayAndReminders) => (
          <CalendarDay
            day={dayAndReminders.day}
            reminders={dayAndReminders.reminders}
            key={dayAndReminders.day}
          ></CalendarDay>
        ))}
        {daysAndRemindersInTheLastWeekAfterTheLastDay.map((dayAndReminders) => (
          <CalendarDay
            className="month=prev"
            day={dayAndReminders.day}
            key={dayAndReminders.day}
            reminders={dayAndReminders.reminders}
          ></CalendarDay>
        ))}
      </ol>
    );
  };

  return (
    <div className="">
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
