import React, { useState, useEffect } from 'react';
import './messenger.css';
import UserMessengerCard from '../../components/user-messenger-card/user-messenger-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import NewMessageCard from './new-message-card';
import { get_messages_for_direct_conversation, get_my_message_threads } from '../../services/messenger-api-service';
import ConversationCard from '../../components/conversation-card/conversation-card';

const Messenger = () => {
    const [loadingMessageThreads, setLoadingMessageThreads] = useState(true);

    const [isNewMessageCardOpen, setIsNewMessageCardOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [selectedConversationID, setSelectedConversationID] = useState(null);
    const [selectedConversationType, setSelectedConversationType] = useState(null); // ['DIRECT', 'GROUP', 'OTHER']
    const [conversationMessages, setConversationMessages] = useState([]);
    const [conversationHasMessages, setConversationHasMessages] = useState(false);



    const handleShowNewMessageCard = () => {
        setIsNewMessageCardOpen(true);
    }

    const handleCreateConversationClose = () => {
        setIsNewMessageCardOpen(false);
    }

    const handleConversationClick = (conversation_ID) => {
        //set selected conversation ID
        setSelectedConversationID(conversation_ID);

        //fetch messages for conversation
        fetchConversationMessages(conversation_ID);
    }

    const fetchConversationMessages = async (conversation_ID) => {
        //find type of conversation
        var conversationType = conversations.find(conversation => conversation.conversation_ID === conversation_ID).conversation_Type;

        //fetch messages
        if(conversationType === 'DIRECT'){
            //fetch direct messages
            const messagesResponse = await get_messages_for_direct_conversation(conversation_ID, 1, 20);
            console.log('messagesResponse:--');
            console.log(messagesResponse);

            if (messagesResponse !== false){
                setConversationMessages(messagesResponse);

                //if messagesResponse is empty, set conversationHasMessages to false
                if (messagesResponse.length === 0){
                    setConversationHasMessages(false);
                } else {
                    setConversationHasMessages(true);
                }
            } else {
                console.error('error fetching messages');
            }
        } else if (conversationType === 'GROUP'){
            //fetch group messages
        } else {
            console.error('conversation type not found');
        };


    };

    useEffect(() => {
        const fetchConversations = async () => {
            var conversationsResponse = await get_my_message_threads();

            if (conversationsResponse !== false){
                setConversations(conversationsResponse);
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
                            <FontAwesomeIcon icon={faCommentMedical} size='xl' color='white' /> {/* TODO change icon because this is ugly */}
                        </button>
                    </div>
                    <div className="messenger-conversation-list">
                        {loadingMessageThreads ? (
                            <div>Loading...</div>
                        ) : (
                            conversations.map((conversations) => {
                                if (conversations.conversation_Type === 'DIRECT') {
                                    return (
                                        <ConversationCard
                                            isSelected={selectedConversationID === conversations.conversation_ID}
                                            name={conversations.user2_Name}
                                            type={conversations.conversation_Type}
                                            recentDate={conversations.lastMessageTimestamp}
                                            conversation_id={conversations.conversation_ID}
                                            conversationClicked={handleConversationClick}
                                            key={conversations.conversation_ID}
                                        />
                                    );
                                } else if (message.conversation_Type === 'GROUP') {
                                    return (
                                        <ConversationCard
                                            isSelected={selectedConversationID === conversations.conversation_ID}
                                            name={conversations.name}
                                            type={conversations.conversation_Type}
                                            recentDate={conversations.lastMessageTimestamp}
                                            conversation_id={conversations.conversation_ID}
                                            conversationClicked={handleConversationClick}
                                            key={conversations.conversation_ID}
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
                    {selectedConversationID !== null ? (
                        conversationHasMessages ? (
                            <div>messages</div>
                        ) : (
                            <div className="w-full h-full flex flex-col justify-center content-center">
                                <h1 className="m-auto no-conversation-text">No messages</h1>
                                <div className="messenger-input-container">
                                    <FontAwesomeIcon icon={faPaperclip} size='xl' className="cursor-pointer"/>
                                    <textarea placeholder="Send a message" maxLength={500}></textarea>
                                    <button className="icon-button">
                                        Send
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </button>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center content-center">
                            <h1 className="m-auto no-conversation-text">Please select a conversation</h1>
                        </div>
                    )}
                </div>
            </div>
            {isNewMessageCardOpen && <NewMessageCard onClose={handleCreateConversationClose}/>}
        </div>
        
    );
};

export default Messenger;
