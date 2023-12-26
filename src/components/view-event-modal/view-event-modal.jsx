import React from 'react';
import './view-event-modal.css';
import { CirclePicker } from 'react-color';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { add_calendar_event, delete_calendar_event, update_calendar_event } from '../../services/calendar-api-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faBan, faPenToSquare, faComments } from '@fortawesome/free-solid-svg-icons'

// import { isColorLight } from '../../util/isColorLight';

function isColorLight(color) {
    var c = color.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 100) {
        return false; // Bright colors - black font
    } else {
        return true; // Dark colors - white font
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+:\d+)/, '$3-$2-$1 $4');
}

const ViewEventModal = ({event, onUpdateEvent, onClose, canUpdate, onEventDelete}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [color, setColor] = useState('#2196f3');
    const [textColor, setTextColor] = useState('#000000'); // Default to black text

    const [updateMode, setUpdateMode] = useState(false); //controls whether the modal is in update mode or not

    const customColors = [
        '#2196f3', '#f44336','#e91e63', '#9c27b0', '#673ab7', 
        '#3f51b5', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
        '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
        '#ff5722', '#795548', '#607d8b', '#000000', '#991234'
    ];


    const handleColorChange = (color) => {
        setColor(color.hex);
        // Determine if the color is light or dark
        // Set text color to white if background color is dark, otherwise black
        var colorIsLight = isColorLight(color.hex);

        if (colorIsLight) {
            setTextColor('#000000');
        } else {
            setTextColor('#ffffff');
        }

        //print wether the color is light or dark
        console.log(isColorLight(color.hex) ? 'light' : 'dark');

    };

    const handleUpdateEvent = async () => {
        //ensure title is not empty
        if (title === '') {
            alert('Title cannot be empty');
            return;
        }

        //ensure start date is before end date
        if (startDate > endDate) {
            alert('Start date must be before end date');
            return;
        }

        //create new event object
        event.title = title;
        event.description = description;
        event.startDate = startDate;
        event.endDate = endDate;
        event.color = color;

        //send api request
        const response = await update_calendar_event(event);
        console.log(response);

        if (response && response.status === 200) {

            const data = await response.json();
            console.log(data);
            const newEvent = {
                title: title,
                description: description,
                startDate: startDate,
                endDate: endDate,
                color: color,
                Event_ID: data.event_ID
            };
            console.log("New Event:");
            console.log(newEvent);
            onUpdateEvent(newEvent); // Call the callback with the new event
            onClose(); // Close the modal
        } else {
            // Handle errors
            alert('Error adding event');
        }
    };

    const cancelEdit = () => {
        //reset parameters
        setTitle(event.title);
        setDescription(event.description);
        setStartDate(event.startDate);
        setEndDate(event.endDate);
        setColor(event.color);

        //set update mode to false
        setUpdateMode(false);

    };

    const handleDeleteEvent = async () => {
        console.log("Deleting event");
        //send api request
        const response = await delete_calendar_event(event.event_ID);

        if(response === true) {
            console.log("Event deleted");
            onEventDelete(event.event_ID);
            onClose();
        }
        else {
            alert("Error deleting event");
        }
    };



    //load parameters from the event object
    useEffect(() => {
        setTitle(event.title);
        setDescription(event.description);
        setStartDate(event.startDate);
        setEndDate(event.endDate);
        setColor(event.color);
    }, [event]);

    return (
        <div className="view-modal-frame">
            <div className="view-modal-content">
                <div className="page-header">
                    <div className="flex flex-row justify-between w-full">
                        {updateMode && 
                        <div className="flex flex-row gap-0 items-center justify-start">
                            <div className="color-indicator" style={{backgroundColor: color}}></div>
                            <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </div> 
                        || 
                        <div className="flex flex-row gap-0 items-center justify-start">
                            <div className="color-indicator" style={{backgroundColor: color}}></div>
                            <h1 className="ellipsis">{event.title}</h1>
                        </div>
                        }
                        {
                            !canUpdate ? (
                                <div></div>
                            ) : (
                                updateMode ? (
                                <div className="flex flex-row justify-center items-center w-fit p-1 gap-2">
                                    <div className="save-button">
                                    <button className="icon-button" onClick={cancelEdit}>
                                        <FontAwesomeIcon icon={faPenToSquare} /> <p>Cancel</p>
                                    </button>
                                    </div>
                                    <div className="save-button">
                                    <button className="icon-button" onClick={handleUpdateEvent}>
                                        <FontAwesomeIcon icon={faPenToSquare} /> <p>Update</p>
                                    </button>
                                    </div>
                                </div>
                                ) : (
                                <div className="flex flex-row justify-center items-center w-fit p-1 gap-2">
                                    <div className="edit-button">
                                    <button className="icon-button" onClick={() => setUpdateMode(true)}>
                                        <FontAwesomeIcon icon={faPencil} /> <p>Edit</p>
                                    </button>
                                    </div>
                                </div>
                                )
                            )
                            }
                                                    
                            {!canUpdate && !updateMode &&
                            <div className="flex flex-row justify-center items-center w-fit p-1 gap-2">
                            <FontAwesomeIcon icon={faBan} />
                            <h3>Read Only</h3>
                        </div>}
                    </div>
                    <div className="line-divider mt-4"></div>
                </div>
                <div className="modal-body mt-8">
                    <div className="flex flex-row w-3/4 justify-start self-start items-center gap-6 pl-6 pr-6">
                        {/* <FontAwesomeIcon icon={faCalendarDay} /> */}
                        <div className="flex flex-col">
                            <h3>Date</h3>
                            {canUpdate && <DatePicker 
                                selected={startDate} 
                                onChange={(date) => setStartDate(date)} 
                                timeCaption="Time"
                                dateFormat="MMM d"
                            /> || <p>{startDate.toLocaleDateString()} {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>}
                        </div>
                        <div className="flex flex-col">
                            <h3>Start Time</h3>
                            {canUpdate && <DatePicker 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)} 
                            showTimeSelect
                            showTimeSelectOnly
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        /> || <p>{startDate.toLocaleDateString()} {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>}
                        </div>
                        <div className="flex flex-col">
                            <h3>End Time</h3>
                            {canUpdate && 
                            <DatePicker 
                            selected={endDate} 
                            onChange={(date) => setStartDate(date)} 
                            showTimeSelect
                            showTimeSelectOnly
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            />
                            || <p>{startDate.toLocaleDateString()} {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>}
                        </div>

                    </div>
                    <div className="flex flex-col w-full mt-6 pl-6 pr-6">
                        <h3>Description</h3>
                        {updateMode && <textarea className='description-input overflow-auto'
                            placeholder="Description" 
                            maxLength={250} 
                            onChange={(e) => setDescription(e.target.value)}
                            value={description} // Add this to control the value
                            rows={4} // Adjust the number of rows as needed
                            /> 
                            || 
                            <div className="description-container">
                                <p>{event.description}</p>
                            </div>
                        }
                    </div>
                    {updateMode &&
                    <div className="flex flex-col w-full mt-6 pl-6 pr-6">
                    <CirclePicker 
                            colors={customColors} 
                            width="75%" 
                            circleSpacing={10} 
                            circleSize={28} // You can adjust circleSize for bigger or smaller circles
                            onChangeComplete={handleColorChange}
                        /> 
                    </div> }
                   
                    
                    <div className='flex flex-col w-full mt-6 pl-6 pr-6'>
                        <h3>Creator</h3>
                        <div className="flex flex-row gap-2 justify-start items-center ml-2 save-button">
                            <div className="flex flex-col gap-0 time-created-string">
                                <h4 className="font-bold">{event.assignedBy}</h4>
                                <p className="pl-4">{formatDate(event.dateCreated)}</p>
                            </div>
                            <button className="icon-button ml-8">
                                <FontAwesomeIcon icon={faComments} /> <p>Message</p>
                            </button>
                        </div>
                    </div>
                   
                    <div className="line-divider"></div>
                    <div className="flex flex-row justify-end w-full p-4 gap-4">
                        {canUpdate && <div className="save-button">
                            <button onClick={handleDeleteEvent} >Delete</button>
                            </div>
                            }
                        <button onClick={onClose}>Close</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default ViewEventModal;
