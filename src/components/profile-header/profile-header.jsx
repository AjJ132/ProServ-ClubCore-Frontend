import React from 'react';
import './profile-header.css';
import profileImage from '../../assets/Profile-image.jpg';

const ProfileHeader = ({ isCollapsed }) => {
    let clubName = localStorage.getItem('club_name');
    return (
        <div className='vertical-stack' style={{ opacity: !isCollapsed ? 0 : 1, maxHeight: '225px   ' }}>
            <div id="profileImage" style={{ backgroundImage: `url(${profileImage})` }}>
            </div>
            <p className='profile-header-name' style={{ marginBlockStart: 0, marginBlockEnd: 0 }}>{localStorage.getItem('first_name')} {localStorage.getItem('last_name')}</p>
            <p className='profile-header-team' style={{ marginBlockStart: 0, marginBlockEnd: 0 }}>{clubName}</p>
        </div>
    );
};

export default ProfileHeader;
