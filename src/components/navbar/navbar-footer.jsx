// src/components/navbar/navbar-footer.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const NavbarFooter = ({isCollapsed}) => {
  return (
    <Link 
      to="/settings" 
      className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`}>
      <FontAwesomeIcon icon={faCog} /> {/* Cog icon */}
      {isCollapsed && ' Settings'}
  </Link>
  );
};

export default NavbarFooter;
