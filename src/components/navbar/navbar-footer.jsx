// src/components/navbar/navbar-footer.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const NavbarFooter = ({isCollapsed}) => {
  return (
    <a className='navbar-footer' href='#settings'>
      <FontAwesomeIcon icon={faCog} /> {/* Cog icon */}
      {isCollapsed && ' Settings'}
    </a>
  );
};

export default NavbarFooter;
