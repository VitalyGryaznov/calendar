import dayjs from "dayjs";
import { calendarDateFormat } from "../types";

const getNumberOfDaysInMoth = (year: number, month: number): number => {
  return dayjs(new Date(year, month, 1)).daysInMonth();
};

const getDaysFromTheCurrentMonth = (
  year: number,
  month: number
): Array<string> =>
  Array(getNumberOfDaysInMoth(year, month))
    .fill(0)
    .map((_, i) =>
      dayjs(new Date(year, month, i + 1)).format(calendarDateFormat)
    );

const getDaysFromThePreviousMonthAtTheFirstWeekOfTheCurrentMonth = (
  year: number,
  month: number
): Array<string> => {
  const numberOfDaysInPreviousMonth = getNumberOfDaysInMoth(year, month - 1);
  const numberOfDaysInPreviousMonthBelongToFirstWeekOfTheCurrentMonth = dayjs(
    new Date(year, month, 1)
  ).day();
  return Array(numberOfDaysInPreviousMonthBelongToFirstWeekOfTheCurrentMonth)
    .fill(0)
    .map((_, i) => numberOfDaysInPreviousMonth - i)
    .reverse()
    .map((day) =>
      dayjs(new Date(year, month - 1, day)).format(calendarDateFormat)
    );
};

const getDaysFromTheNextMonthAtTheLastWeekOfTheCurrentMonth = (
  year: number,
  month: number
): Array<string> => {
  const daysInMonth = getNumberOfDaysInMoth(year, month);
  const numberOfDaysInNextMonthBelongToLastWeekOfTheCurrentMonth =
    6 - dayjs(new Date(year, month, daysInMonth)).day();
  return Array(numberOfDaysInNextMonthBelongToLastWeekOfTheCurrentMonth)
    .fill(0)
    .map((_, i) =>
      dayjs(new Date(year, month + 1, i + 1)).format(calendarDateFormat)
    );
};

export {
  getDaysFromTheCurrentMonth,
  getDaysFromThePreviousMonthAtTheFirstWeekOfTheCurrentMonth,
  getDaysFromTheNextMonthAtTheLastWeekOfTheCurrentMonth,
};
