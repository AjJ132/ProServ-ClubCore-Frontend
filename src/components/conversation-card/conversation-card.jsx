import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import './conversation-card.css';

const ConversationCard = ({isSelected, name, type, recentDate, conversation_id, conversationClicked}) => {
    const [isGroup, setIsGroup] = useState(false);
    const [selected, setIsSelected] = useState(false);

        useEffect(() => {
            if (type === 'group'){
                setIsGroup(true);
            } else {
                setIsGroup(false);
            }
        }, []);

        useEffect(() => {
            setIsSelected(isSelected);
        }, [isSelected]);


        return (
            <div className={`conversation-card ${isSelected ? 'conversation-card-selected' : ''}`} onClick={() => conversationClicked(conversation_id)}>
                {isGroup ? <FontAwesomeIcon icon={faUsers} size='2xl' /> : <FontAwesomeIcon icon={faUser} size='2xl' />}
                <div className="flex flex-col">
                    <span>{name}</span>
                </div>
                <div className="flex flex-col ml-auto">
                    <h2>{recentDate}</h2>
                </div>
            </div>
        );
    };

export default ConversationCard;
