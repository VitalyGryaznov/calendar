import Calendar from "../calendar/Calendar";
import React from "react";
import "./Content.scss";
import ModalDialog from "../modalDialog/modalDialog";
import CalendarNavigation from "../calendarNavigation/CalendarNavigation";

function Content() {
  return (
    <div className="content_container" data-testid="content">
      <ModalDialog></ModalDialog>
      <CalendarNavigation></CalendarNavigation>
      <Calendar></Calendar>
    </div>
  );
}

export default Content;
