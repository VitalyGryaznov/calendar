import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import dayjs from "dayjs";
import {
  incrementMonth,
  decrementMonth,
  selectMonth,
  selectYear,
} from "../../redux/Slice";

function CalendarNavigation() {
  const selectedMonth = useAppSelector(selectMonth);
  const selectedYear = useAppSelector(selectYear);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        {dayjs(new Date(selectedYear, selectedMonth, 1)).format("MMMM YYYY")}
      </div>
      <div> Today?</div>

      <button onClick={() => dispatch(incrementMonth())}>Next month</button>
      <button onClick={() => dispatch(decrementMonth())}>Previous month</button>
    </div>
  );
}

export default CalendarNavigation;
