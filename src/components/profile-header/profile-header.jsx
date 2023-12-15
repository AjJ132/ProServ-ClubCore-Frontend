import React from 'react';
import './profile-header.css';
import profileImage from '../../assets/Profile-image.jpg';

const ProfileHeader = ({ isCollapsed }) => {
    return (
        <div className='vertical-stack' style={{ opacity: !isCollapsed ? 0 : 1, maxHeight: '225px   ' }}>
            <div id="profileImage" style={{ backgroundImage: `url(${profileImage})` }}>
            </div>
            <p className='profile-header-name' style={{ marginBlockStart: 0, marginBlockEnd: 0 }}>AJ Johnson</p>
            <p className='profile-header-team' style={{ marginBlockStart: 0, marginBlockEnd: 0 }}>Men's Track and Field</p>
        </div>
    );
};

export default ProfileHeader;
