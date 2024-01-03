import React, { useState, useEffect } from 'react';
import './messenger.css';
import UserMessengerCard from '../../components/user-messenger-card/user-messenger-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import NewMessageCard from './new-message-card';
import { get_messages_for_direct_conversation, get_my_message_threads, mark_direct_message_as_read, send_Direct_Message } from '../../services/messenger-api-service';
import ConversationCard from '../../components/conversation-card/conversation-card';
import MessageBubble from '../../components/message-bubble/MessageBubble';

const Messenger = () => {
    const [loadingMessageThreads, setLoadingMessageThreads] = useState(true);

    const [isNewMessageCardOpen, setIsNewMessageCardOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [selectedConversationID, setSelectedConversationID] = useState(null);
    const [selectedConversationType, setSelectedConversationType] = useState(null); // ['DIRECT', 'GROUP', 'OTHER']
    const [conversationMessages, setConversationMessages] = useState([]);
    const [conversationHasMessages, setConversationHasMessages] = useState(false);
    const [newMessage, setNewMessage] = useState(''); 



    const handleShowNewMessageCard = () => {
        setIsNewMessageCardOpen(true);
    }

    const handleCreateConversationClose = () => {
        setIsNewMessageCardOpen(false);
    }

    const handleConversationClick = (conversation_ID) => {
        //if conversation is already selected, do nothing
        if (selectedConversationID === conversation_ID){
            return;
        }

        
        //set selected conversation ID
        setSelectedConversationID(conversation_ID);

        //clear newMessage
        setNewMessage(''); 
        setSelectedConversationType(conversations.find(conversation => conversation.conversation_ID === conversation_ID).conversation_Type);

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

                    const user_ID = sessionStorage.getItem('user_ID');

                    // if any messages are unread from the other user, mark them as read
                    if (messagesResponse.some(message => message.seen === false && message.sender_ID !== user_ID)){
                        await mark_direct_message_as_read(conversation_ID);
                    }
                }
            } else {
                console.error('error fetching messages');
            }
        } else if (conversationType === 'GROUP'){
            //fetch group messages
        } else {
            console
            console.error('conversation type not found');
            console.error(conversationType);
        };


    };

    const handleMessageSend = async () => {
        //check if message is empty
        if (newMessage === ''){
            return;
        }

        //detect conversation type
        if (selectedConversationType === 'DIRECT'){
            //send direct message
            var messageSendResponse = await send_Direct_Message(selectedConversationID, newMessage);

            if (messageSendResponse !== false){
                //add message to conversationMessages
                setConversationMessages([messageSendResponse, ...conversationMessages]);
                setNewMessage('');
            } else {
                console.error('error sending message');
            }
        } else if (selectedConversationType === 'GROUP'){
            //send group message
        } else {
            console.error('conversation type not found');
            console.error(selectedConversationType);
        }
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
        <div className="page-content overflow-y-hidden">
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
                            conversations
                            .sort((a, b) => {
                                // If both timestamps are null, they are equal
                                if (a.lastMessageTimestamp === null && b.lastMessageTimestamp === null) {
                                    return 0;
                                }
                                // If a's timestamp is null, b comes first
                                if (a.lastMessageTimestamp === null) {
                                    return 1;
                                }
                                // If b's timestamp is null, a comes first
                                if (b.lastMessageTimestamp === null) {
                                    return -1;
                                }
                                // If neither are null, sort by timestamp
                                return b.lastMessageTimestamp - a.lastMessageTimestamp;
                            })
                                .map((conversations) => {
                                    if (conversations.conversation_Type === 'DIRECT') {
                                        return (
                                            <ConversationCard
                                                isSelected={selectedConversationID === conversations.conversation_ID}
                                                name={conversations.user2_Name}
                                                type={conversations.conversation_Type}
                                                recentDate={conversations.lastMessageTimestamp}
                                                conversation_id={conversations.conversation_ID}
                                                conversationClicked={handleConversationClick}
                                                hasUnreadMessagesProp={conversations.hasUnreadMessages}
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
                                                hasUnreadMessagesProp={conversations.hasUnreadMessages}
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
                            <div className="messenger-chat-body-container">
                                <div className="messenger-messages-container">
                                    <div className="messenger-messages-container-chat-list">
                                        <div className="messenger-messages-reverse-infinite-scroll">
                                            {conversationMessages.map((message, index) => (
                                                <MessageBubble
                                                    key={index}
                                                    message={message}
                                                    isOwnMessage={message.sender_ID === sessionStorage.getItem('user_ID')}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="messenger-input-container">
                                    <FontAwesomeIcon icon={faPaperclip} size='xl' className="cursor-pointer"/>
                                    <textarea placeholder="Send a message" maxLength={250} value={newMessage} onChange={(e) => setNewMessage(e.target.value)}></textarea>
                                    <button className="icon-button" onClick={handleMessageSend}>
                                        Send
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </button>
                                </div>
                            </div>

                        ) : (
                            <div className="w-full h-full flex flex-col justify-center content-center">
                                <h1 className="m-auto no-conversation-text">No messages</h1>
                                <div className="messenger-input-container">
                                    <FontAwesomeIcon icon={faPaperclip} size='xl' className="cursor-pointer"/>
                                    <textarea placeholder="Send a message" maxLength={500} value={newMessage} onChange={(e) => setNewMessage(e.target.value)}></textarea>
                                    <button className="icon-button" onClick={handleMessageSend}>
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
