import React from "react";
import "./CalendarNavigation.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import dayjs from "dayjs";
import {
  incrementMonth,
  decrementMonth,
  selectMonth,
  selectYear,
} from "../../redux/Slice";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function CalendarNavigation() {
  const selectedMonth = useAppSelector(selectMonth);
  const selectedYear = useAppSelector(selectYear);
  const dispatch = useAppDispatch();

  return (
    <div className="navigation">
      <IconButton
        aria-label="delete"
        color="primary"
        onClick={() => dispatch(decrementMonth())}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        aria-label="delete"
        color="primary"
        onClick={() => dispatch(incrementMonth())}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <div className="navigation_currentMonth">
        {dayjs(new Date(selectedYear, selectedMonth, 1)).format("MMMM YYYY")}
      </div>
    </div>
  );
}

export default CalendarNavigation;
