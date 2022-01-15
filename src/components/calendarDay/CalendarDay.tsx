import React from 'react';
import Reminder from '../reminder/Reminder';
import { ReminderType } from "../../types";

function CalendarDay(props: any) {
    let isDayActive = "calendarDay_header-activeDay";
    
 
    return (
        <li>
            <h2 className={`calendarDay_header ${isDayActive}`}>{props.day.date()}</h2>
            {props.reminders.map((reminder: ReminderType) => <Reminder key={reminder.name + reminder.date.format()} reminder={reminder}> </Reminder>)}
            
        </li>
    )
}

export default CalendarDay
