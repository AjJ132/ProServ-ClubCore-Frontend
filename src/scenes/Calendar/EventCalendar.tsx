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
import { isValid } from 'date-fns';
import React from "react";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import { subDays, addDays } from "date-fns";
import AddEventModal from "../../components/add-event-modal/add-event-modal";
import { get_my_events } from "../../services/calendar-api-service";
import '../../components/add-event-modal/add-event-modal.css'
import ViewEventModal from "../../components/view-event-modal/view-event-modal";
import { useLocation } from 'react-router-dom';
import './Calendar.css'

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface Event {
    Event_ID: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    color: string;
    canUpdate: boolean;
    assignedBy: string;
}

interface EventCalendarProps {
events: Event[];
}

const EventCalendar = () => {

const location = useLocation();
const addEvent = location.state?.addEvent || false;

const [events, setEvents] = useState<Event[]>([]);
const currentDate = new Date();
const [currentMonth, setCurrentMonth] = useState(new Date());
const firstDayOfMonth = useMemo(() => startOfMonth(currentMonth), [currentMonth]);
const lastDayOfMonth = useMemo(() => endOfMonth(currentMonth), [currentMonth]);

// Declare a new state variable for modal visibility
const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [isViewModalOpen, setIsViewModalOpen] = useState(false);

// Declare a new state variable for selected date
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

const [canUpdateEvent, setCanUpdateEvent] = useState(false);

const daysInMonth = useMemo(() => eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
}), [firstDayOfMonth, lastDayOfMonth]);

const startingDayIndex = getDay(firstDayOfMonth);

const daysFromPrevMonth = Array.from({ length: startingDayIndex }).map((_, index) => {
return subDays(firstDayOfMonth, index + 1);
}).reverse();

const daysFromNextMonth = Array.from({ length: 6 * 7 - (startingDayIndex + daysInMonth.length) }).map((_, index) => {
  return addDays(lastDayOfMonth, index + 1);
});
function isColorLight(color) {
    var c = color.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 100) {
        return false;
    } else {
        return true;
    }
}

const eventsByDate = useMemo(() => {
    if (!Array.isArray(events)) {
        console.log('Events is not an array or is undefined');
        return {};
    }

    return events.reduce((acc: { [key: string]: Event[] }, event) => {
        if (event && isValid(event.startDate)) {
            const dateKey = format(event.startDate, "yyyy-MM-dd");
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(event);
        } else if (!event) {
            console.error('Null event found');
        } else {
            console.error('Invalid date found in event:', event);
        }
        return acc;
    }, {});
}, [events]);

const previousMonth = () => {
    setCurrentMonth(prevMonth => {
        const newMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1);
        return newMonth;
    });
};

const nextMonth = () => {
    setCurrentMonth(nextMonth => {
        const newMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1);
        return newMonth;
    });
};

const goToToday = () => {
    setCurrentMonth(currentDate);
}


const handleDayClick = (date: Date) => {
    //launch add event modal
    setSelectedDate(date); // Save the clicked date
    setIsAddModalOpen(true); // Open the modal
};

const handleEventClick = (event, e) => {
    // Prevent the click event from bubbling up to the parent elements
    e.stopPropagation();

    //check if event 

    //launch view event modal
    setSelectedEvent(event); // Save the clicked event
    setIsViewModalOpen(true); // Open the modal

};


const addNewEvent = (newEvent: Event) => {
    console.log('Events2:', events)
    if (Array.isArray(events)) {
        setEvents([...events, newEvent]);
        setIsAddModalOpen(false); // Close the modal
    } else {
        console.error('events2 is not an array');
        // Optionally, reset events2 to an empty array here
        setEvents([]);
    }
    
};


const updateEvent = (updatedEvent: Event) => {
    console.log('Updated event:', updatedEvent);
    if (Array.isArray(events)) {
        const updatedEvents = events.map(event => {
            if (event.Event_ID === updatedEvent.Event_ID) {
                return updatedEvent;
            } else {
                return event;
            }
        });
        setEvents(updatedEvents);
    } else {
        console.error('events2 is not an array');
        // Optionally, reset events2 to an empty array here
        setEvents([]);
    }
};

const handleEventDelete = (eventToDelete: Event) => {
    console.log('Event ID to delete:', eventToDelete);
    if (Array.isArray(events)) {
        const updatedEvents = events.filter(event => event.Event_ID !== eventToDelete.Event_ID);
        setEvents(updatedEvents);
    } else {
        console.error('events2 is not an array');
        // Optionally, reset events2 to an empty array here
        setEvents([]);
    }
}


const fetchEvents = async (date) => {
    try {
        let data = await get_my_events(date, 'month');
        // Convert event dates from string to Date objects
        data = data.map(event => ({
            ...event,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate)
        }));

        if (Array.isArray(data)) {
            setEvents(data);
        } else {
            console.error('Received data is not an array:', data);
            setEvents([]); // Set to empty array if data is not valid
        }
    } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]); // Handle errors appropriately
    }
};


useEffect(() => {
    fetchEvents(firstDayOfMonth);

    console.log('Add event:', addEvent);
    
    if(addEvent === true) {

        console.log('Add event is true');
        setSelectedDate(currentDate);
        setIsAddModalOpen(true);

    }

}, [currentMonth]);


return (
    <div className="page-content">
        <div className="page-header">
            <h1>Calendar</h1>
            <div className="line-divider mt-4"></div>
        </div>
        <div className="calendar-container calendar-bg-offset">
            <div className="w-full  calendar">
                <div className="flex flex-row justify-between content-center w-full mb-4 pl-4 pr-4 mt-4">
                    <button className="icon-button">
                        <FontAwesomeIcon icon={faPlus} /> <p>Add Event</p>
                    </button>
                    <h2 className="text-center calendar-text font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
                    
                    <div className="date-change-button">
                        <button className="no-border-radius" onClick={goToToday}>
                            <div>Today</div>
                        </button>
                        <button onClick={previousMonth}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="no-border-radius">
                            <div>{currentMonth.toLocaleString('default', { month: 'short' })}</div>
                        </button>
                        <button onClick={nextMonth}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                       
                    </div>
                </div>
                <div className="calendar-bg-offset grid grid-cols-7 gap-0 calendar-text h-full" style={{ gridTemplateRows: '0.2fr 1fr 1fr 1fr 1fr 1fr 1fr'}}>
                    {WEEKDAYS.map((day) => (
                        <div key={day} className="border font-bold text-center uppercase calendar-header-text">
                        {day}
                        </div>
                    ))}
                    {daysFromPrevMonth.map((day, index) => (
                        <div
                        key={`prev-month-day-${index}`}
                        className="border p-2 text-center text-gray-500 calendar-previous-month"
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
                            key={event.Event_ID}
                            onClick={(e) => handleEventClick(event, e)}
                            className="event-indicator-preview w-full cursor-pointer" 
                            style={{backgroundColor: event.color}}
                        >
                        <p 
                                className="w-2/5" 
                                style={{
                                    color: isColorLight(event.color) ? '#000000' : '#ffffff',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {event.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p 
                                className="ml-1 ellipsis" 
                                style={{color: isColorLight(event.color) ? '#000000' : '#ffffff' }}
                            >
                                {event.title}
                            </p>
                        </div>
                    ))}
                        </div>
                    );
                    })}
                    {daysFromNextMonth.map((day, index) => (
                        <div
                        key={`prev-month-day-${index}`}
                        className="border p-2 text-center text-gray-500 calendar-previous-month"
                        >
                        {format(day, "d")}
                        </div>
                    ))}
                </div>
                <div className="page-white-space">

            </div>
            </div>
            
        </div>
        {isAddModalOpen && <AddEventModal dateInput={selectedDate } onAddEvent={addNewEvent} onClose={() => setIsAddModalOpen(false)} />}

        {isViewModalOpen && <ViewEventModal event={selectedEvent} onUpdateEvent={updateEvent} onClose={() => setIsViewModalOpen(false)} canUpdate={selectedEvent?.canUpdate} onEventDelete={handleEventDelete}/>}
    </div>
);
};

export default EventCalendar;