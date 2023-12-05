import React from 'react';
import './navbar-links.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faCalendarDays, faHouse, faAlignLeft } from '@fortawesome/free-solid-svg-icons';

const Navbar_Links = ({ isCollapsed }) => {
  return (
    <div className="navbar-links-wrapper">
        <a className='navbar-links-wrapper-btn' href='#Dashboard'>
            <FontAwesomeIcon icon={faHouse} />{isCollapsed && ' Dashboard'}
        </a>
        <a className='navbar-links-wrapper-btn' href='#calendar'>
            <FontAwesomeIcon icon={faCalendarDays} />{isCollapsed && ' Calendar'}
        </a>
        <a className='navbar-links-wrapper-btn' href='#messaging'>
            <FontAwesomeIcon icon={faMessage} />{isCollapsed && ' Messaging'}
        </a>
        <a className='navbar-links-wrapper-btn' href='#Forms'>
            <FontAwesomeIcon icon={faAlignLeft} />{isCollapsed && ' Forms'}
        </a>
    </div> 
  );
};

export default Navbar_Links;
