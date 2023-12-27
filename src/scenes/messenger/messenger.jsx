import React from 'react';
import './messenger.css';

const Messenger = () => {
    return (
        <div className="page-content">
            <div className="page-header messenger-page-header p-6">
                <h1>Messenger</h1>
                {/* <div className="line-divider mt-4"></div> */}
            </div>
            <div className="messenger-body">
                <div className="messenger-chat-list">

                </div>
                <div className="messenger-chat-body">
                </div>
            </div>
        </div>
    );
};

export default Messenger;
