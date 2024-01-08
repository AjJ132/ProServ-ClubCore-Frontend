import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import './conversation-card.css';

const ConversationCard = ({isSelected, name, type, recentDate, conversation_id, conversationClicked, hasUnreadMessagesProp}) => {
    const [isGroup, setIsGroup] = useState(false);
    const [selected, setIsSelected] = useState(false);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(hasUnreadMessagesProp);

    useEffect(() => {
        if (type === 1){
            setIsGroup(true);
        } else {
            setIsGroup(false);
        }
    }, []);

    useEffect(() => {
        setIsSelected(isSelected);
    }, [isSelected]);

    useEffect(() => {
        setHasUnreadMessages(hasUnreadMessagesProp);
    }, [hasUnreadMessagesProp]);

    const handleClick = () => {
        conversationClicked(conversation_id);
        if (hasUnreadMessages) {
            console.log('setting unread messages to false');
            setHasUnreadMessages(false);
        }
    };

    return (
        <div className={`conversation-card ${isSelected ? 'conversation-card-selected' : ''}`} onClick={handleClick}>
            <div style={{minWidth: '50px', maxWidth: '50px'}}>
                {isGroup ? <FontAwesomeIcon icon={faUsers} size='2xl' /> : <FontAwesomeIcon icon={faUser} size='2xl' />}
            </div>
            <div className="flex flex-col">
                <span>{name}</span>
            </div>
            <div className="flex flex-col ml-auto">
                <p style={{color: 'var(--soft-gray)'}}>{recentDate}</p>
            </div>
            {hasUnreadMessages ? <div className="flex flex-col">
                <div className="unread-message-indicator"></div>
            </div> : null}
        </div>
    );
};

export default ConversationCard;