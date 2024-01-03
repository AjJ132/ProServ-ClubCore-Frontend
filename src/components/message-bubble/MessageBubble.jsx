import React, { useEffect } from 'react';
import { format, isToday, isWithinInterval, startOfWeek } from 'date-fns';
import './message-bubble.css';

const MessageBubble = ({ message, isOwnMessage }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
    
        if (isToday(date)) {
            // Format as time only
            return format(date, 'HH:mm');
        } else if (isWithinInterval(date, { start: startOfWeek(now), end: now })) {
            // Format as day of the week and time
            return format(date, 'EEEE HH:mm');
        } else {
            // Format as date and time
            return format(date, 'yyyy-MM-dd HH:mm');
        }
    };

    return (
        <>
           { isOwnMessage ? ( 
             <div className="message-bubble-container">
                <p className='ml-auto mr-4'>{formatDate(message.timestamp)}</p>

                <div className={`message-bubble own-message`}>
                    <span>{message.message}</span>
                </div>
             </div>
             ) : (
                <div className="message-bubble-container">
                <p className='mr-auto ml-4'>{formatDate(message.timestamp)}</p>
                <div className={`message-bubble not-own-message`}>
                    <span>{message.message}</span>
                </div>
             </div>
             )
           }
        </>
    );
};

export default MessageBubble;
