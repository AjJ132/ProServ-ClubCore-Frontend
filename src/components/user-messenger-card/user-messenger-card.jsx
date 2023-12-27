import React from 'react';
import './user-messenger-card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const UserMessengerCard = ({userName}) => {
    return (
        <div className="card-body">
                <div className="user-profile-image">
                    <img src="https://via.placeholder.com/90" alt="user profile" height={90} width={90} className="m-auto"/>
                </div>
                <div className="user-profile-name">
                    <h2>{userName}</h2>
                    <button className="options-button">
                        <FontAwesomeIcon icon={faEllipsis} size='lg' />
                    </button>
                </div>
        </div>
    );
};

export default UserMessengerCard;
