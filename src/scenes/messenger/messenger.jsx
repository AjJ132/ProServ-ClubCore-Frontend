import React, { useState, useEffect } from 'react';
import './messenger.css';
import UserMessengerCard from '../../components/user-messenger-card/user-messenger-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import NewMessageCard from './new-message-card';
import { get_my_message_threads } from '../../services/messenger-api-service';
import ConversationCard from '../../components/conversation-card/conversation-card';
import { set } from 'date-fns';

const Messenger = () => {
    const [loadingMessageThreads, setLoadingMessageThreads] = useState(true);

    const [isNewMessageCardOpen, setIsNewMessageCardOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [selectedConversationID, setSelectedConversationID] = useState(null);



    const handleShowNewMessageCard = () => {
        setIsNewMessageCardOpen(true);
    }

    const handleCreateConversationClose = () => {
        setIsNewMessageCardOpen(false);

        
    }

    const handleConversationClick = (conversation_ID) => {
        setSelectedConversationID(conversation_ID);
    }

    useEffect(() => {
        const fetchConversations = async () => {
            var messages = await get_my_message_threads();

            if (messages !== false){
                setMessages(messages);
            } else {
                console.error('error fetching messages');
            }
            
            setLoadingMessageThreads(false);
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
                    <div className="messenger-conversation-list">
                        {loadingMessageThreads ? (
                            <div>Loading...</div>
                        ) : (
                            messages.map((message) => {
                                if (message.conversation_Type === 'DIRECT') {
                                    return (
                                        <ConversationCard
                                            isSelected={selectedConversationID === message.conversation_ID}
                                            name={message.user2_Name}
                                            type={message.conversation_Type}
                                            recentDate={message.lastMessageTimestamp}
                                            conversation_id={message.conversation_ID}
                                            conversationClicked={handleConversationClick}
                                            key={message.conversation_ID}
                                        />
                                    );
                                } else if (message.conversation_Type === 'GROUP') {
                                    return (
                                        <ConversationCard
                                            isSelected={selectedConversationID === message.conversation_ID}
                                            name={message.name}
                                            type={message.conversation_Type}
                                            recentDate={message.lastMessageTimestamp}
                                            conversation_id={message.conversation_ID}
                                            conversationClicked={handleConversationClick}
                                            key={message.conversation_ID}
                                        />
                                    );
                                } else {
                                    return null; // Handle other conversation types here
                                }
                            })
                        )}
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
