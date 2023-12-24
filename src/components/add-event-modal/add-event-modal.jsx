import React from 'react';
import './add-event-modal.css';
import { CirclePicker } from 'react-color';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const AddEventModal = ({dateInput,onClose}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [color, setColor] = useState('f44336');
    const [textColor, setTextColor] = useState('#000000'); // Default to black text

    const customColors = [
        '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
        '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
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

    //set date to the date passed in from the calendar
    useEffect(() => {
    if (dateInput) {
        const dateObject = new Date(dateInput);
        setDate(dateObject);
    }
}, [dateInput]);

    return (
        <div className="modal-frame">
            <div className="modal-content">
                <div className="page-header">
                    <h1>Add Event</h1>
                    <div className="line-divider mt-4"></div>
                </div>
                <div className="modal-body mt-8">
                    <div className="date-preview">
                        <div className="date-preview-box p-2">
                            <h3>{date.getDate()}</h3>
                            <div className="event-indicator-preview mt-2" style={{backgroundColor: color}}>
                                <p className="ellipsis" style={{color: textColor}}>{title}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col justify-center items-start gap-1 w-full mt-14 pl-8 pr-8">
                            <h3>Title <strong>*</strong></h3>
                            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={50}/>
                        </div>  
                        <div className="flex flex-col justify-center items-start gap-1 w-full pl-8 pr-8">
                            <h3>Description</h3>
                            <textarea className='description-input'
                                placeholder="Description" 
                                maxLength={250} 
                                onChange={(e) => setDescription(e.target.value)}
                                value={description} // Add this to control the value
                                rows={4} // Adjust the number of rows as needed
                            />
                        </div>
                        <div className="flex flex-col justify-center items-start gap-1 w-full pl-8 pr-8">
                            <h3>Color</h3>
                            <CirclePicker 
                                    colors={customColors} 
                                    width="100%" 
                                    circleSpacing={10} 
                                    circleSize={28} // You can adjust circleSize for bigger or smaller circles
                                    onChangeComplete={handleColorChange}
                                />
                        </div>
                        <div className="flex flex-col justify-center items-start gap-1 w-full pl-8 pr-8">
                            <h3>Date</h3>
                            <DatePicker 
                                selected={date} 
                                onChange={(date) => setDate(date)} 
                            />
                        </div>

                        <div className="flex flex-row justify-center items-center gap-4 w-full mt-14 pl-8 pr-8">
                            <button className="cancel-btn" onClick={onClose}>Cancel</button>
                            <button className="save-btn">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEventModal;
