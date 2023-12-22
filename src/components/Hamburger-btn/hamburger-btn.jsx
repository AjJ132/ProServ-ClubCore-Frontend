import React from 'react';
import './hamburger-btn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';

const HamburgerBtn = ({ isCollapsed }) => {
  return (
    <div className='navbar-links-wrapper'>
      <a className="navbar-links-wrapper-btn">
        <FontAwesomeIcon icon={isCollapsed ? faArrowLeft : faBars} />
        {isCollapsed && "Close Menu"} 
      </a>
    </div>
  );
};

export default HamburgerBtn;
