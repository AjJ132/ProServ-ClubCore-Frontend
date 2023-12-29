import React, { useState, useEffect } from 'react';
import './messenger.css';
import UserMessengerCard from '../../components/user-messenger-card/user-messenger-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import NewMessageCard from './new-message-card';
import { get_my_message_threads } from '../../services/messenger-api-service';

const Messenger = () => {
    const [isNewMessageCardOpen, setIsNewMessageCardOpen] = useState(false);
    const handleShowNewMessageCard = () => {
        setIsNewMessageCardOpen(true);
    }

    const handleCreateConversationClose = () => {
        setIsNewMessageCardOpen(false);

        //TODO refresh messenger page
    }

    useEffect(() => {
        const fetchConversations = async () => {
            var messages = await get_my_message_threads();
            console.log(messages);


        }

        fetchConversations();
    }, []);

    return (
        <div className="page-content">
            <div className="page-header messenger-page-header p-6">
                <h1>Messenger</h1>
                {/* <div className="line-divider mt-4"></div> */}
            </div>
            <div className="messenger-body">
                <div className="messenger-chat-list">
                    <UserMessengerCard userName={`${sessionStorage.getItem('first_name')} ${sessionStorage.getItem('last_name')}`}/>
                    
                    <div className="message-search-container new-chat">
                        <input type="text" placeholder="Search" />
                        <button onClick={handleShowNewMessageCard}>
                            <FontAwesomeIcon icon={faCommentMedical} size='xl' /> {/* TODO change icon because this is ugly */}
                        </button>
                    </div>
                </div>
                <div className="messenger-chat-body">
                </div>
            </div>
            {isNewMessageCardOpen && <NewMessageCard onClose={handleCreateConversationClose}/>}
        </div>
        
    );
};

export default Messenger;
