import React from 'react';
import "./Reminder.scss";

function Reminder(props: any) {

    const hadleClick = 

    return (
        <div className="reminder" onClick={hadleClick}>
            {`${props.reminder.date.format("h:m A")} ${props.reminder.name}`}
        </div>
    )
}

export default Reminder
