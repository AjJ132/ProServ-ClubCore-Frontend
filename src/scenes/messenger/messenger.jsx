import React, { useEffect } from 'react';
import './messenger.css';
import UserMessengerCard from '../../components/user-messenger-card/user-messenger-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';

const Messenger = () => {
    useEffect(() => {


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
                        <button>
                            <FontAwesomeIcon icon={faCommentMedical} size='xl' /> {/* TODO change icon because this is ugly */}
                        </button>
                    </div>
                </div>
                <div className="messenger-chat-body">
                </div>
            </div>
        </div>
    );
};

export default Messenger;
