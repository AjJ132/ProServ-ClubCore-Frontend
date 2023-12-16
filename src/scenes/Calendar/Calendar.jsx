import React from 'react';
import { Calendar as RsuiteCalendar  } from 'rsuite';
import './Calendar.css';
import 'rsuite/dist/rsuite-no-reset.css';

// Documentation for the Calendar component:
// https://rsuitejs.com/components/calendar/#basic

const Calendar = () => {    
    return (
        <div className="page-content">
           <div className="page-header">
            <h1>Calendar</h1>
            <div className="line-divider mt-4"></div>
            </div>
            <div className="calendar-container">
                <RsuiteCalendar bordered cellClassName={date => (date.getDay() % 2 ? "calendar-bg-offset" : undefined)}/>
                <div className="calendar-quick-info section-border p-4">
                    <h2>Coming Up</h2>
                    <div className="line-divider"></div>
                    <h3>Practice</h3>
                    <h3>Meet</h3>
                    <h3>Practice</h3>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
