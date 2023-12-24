import clsx from "clsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {
eachDayOfInterval,
endOfMonth,
format,
getDay,
isToday,
startOfMonth,
} from "date-fns";
import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import { subDays } from "date-fns";
import AddEventModal from "../../components/add-event-modal/add-event-modal";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Event {
date: Date;
title: string;
}

interface EventCalendarProps {
events: Event[];
}

const EventCalendar = ({ events }: EventCalendarProps) => {
const currentDate = new Date();
const firstDayOfMonth = startOfMonth(currentDate);
const lastDayOfMonth = endOfMonth(currentDate);

// Declare a new state variable for modal visibility
const [isModalOpen, setIsModalOpen] = useState(false);

// Declare a new state variable for selected date
const [selectedDate, setSelectedDate] = useState<Date | null>(null);

const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
});

const startingDayIndex = getDay(firstDayOfMonth);

const daysFromPrevMonth = Array.from({ length: startingDayIndex }).map((_, index) => {
return subDays(firstDayOfMonth, index + 1);
}).reverse();

const eventsByDate = useMemo(() => {
    return events.reduce((acc: { [key: string]: Event[] }, event) => {
    const dateKey = format(event.date, "yyyy-MM-dd");
    if (!acc[dateKey]) {
        acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
    }, {});
}, [events]);


const handleDayClick = (date: Date) => {
    //launch add event modal



};

return (
    <div className="page-content ">
        <div className="page-header">
            <h1>Calendar</h1>
            <div className="line-divider mt-4"></div>
        </div>
        <div className="calendar-container calendar-bg-offset">
        <div className="w-full h-full calendar">
            <div className="flex flex-row justify-between content-center w-full mb-4 pl-4 pr-4 mt-4">
                <div className="date-change-button">
                    <button>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                   <button className="no-border-radius">
                        <h3>Dec</h3>
                    </button>
                    <button>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <h2 className="text-center calendar-text font-bold">{format(currentDate, "MMMM yyyy")}</h2>
                <button className="icon-button">
                    <FontAwesomeIcon icon={faPlus} /> <p>Add Event</p>
                </button>
            </div>
            <div className="grid grid-cols-7 gap-0 calendar-text h-3/4" style={{ gridTemplateRows: '0.2fr 1fr 1fr 1fr 1fr 1fr 1fr'}}>
                {WEEKDAYS.map((day) => (
                    <div key={day} className="border font-bold text-center uppercase calendar-header-text">
                    {day}
                    </div>
                ))}
                {daysFromPrevMonth.map((day, index) => (
                    <div
                    key={`prev-month-day-${index}`}
                    className="border p-2 text-center text-gray-500"
                    >
                    {format(day, "d")}
                    </div>
                ))}
                {daysInMonth.map((day, index) => {
                const dateKey = format(day, "yyyy-MM-dd");
                const todaysEvents = eventsByDate[dateKey] || [];
                return (
                    <div
                    key={index}
                    className={clsx("border p-2 text-center", {
                        "calendar-today": isToday(day),
                    })}
                    onClick={() => handleDayClick(day)}
                    >
                    {format(day, "d")}
                    {todaysEvents.map((event) => (
                        <div
                            key={event.title}
                            className="bg-green-500 rounded-md text-gray-900"
                        >
                            {event.title}
                        </div>
                    ))}
                    </div>
                );
                })}
            </div>
        </div>
        </div>
        {isModalOpen && <AddEventModal date={selectedDate} onClose={() => setIsModalOpen(false)} />}
    </div>
);
};

export default EventCalendar;