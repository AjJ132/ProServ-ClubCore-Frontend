import React from 'react';
import './messenger.css';
import UserMessengerCard from '../../components/user-messenger-card/user-messenger-card';

const Messenger = () => {
    return (
        <div className="page-content">
            <div className="page-header messenger-page-header p-6">
                <h1>Messenger</h1>
                {/* <div className="line-divider mt-4"></div> */}
            </div>
            <div className="messenger-body">
                <div className="messenger-chat-list">
                    <UserMessengerCard userName={`${localStorage.getItem('first_name')} ${localStorage.getItem('last_name')}`}/>
                    
                    <div className="message-search-container">
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
                <div className="messenger-chat-body">
                </div>
            </div>
        </div>
    );
};

export default Messenger;
