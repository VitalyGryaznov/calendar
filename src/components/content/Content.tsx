import Calendar from '../calendar/Calendar';
import React from 'react';
import "./Content.scss";

function Content() {
    return (
        <div className="content_container" data-testid="content">
            <Calendar></Calendar>
        </div>
    )
}

export default Content
