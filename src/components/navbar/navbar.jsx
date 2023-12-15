// src/components/Navbar/Navbar.jsx

import React from 'react';
import './Navbar.css';
import ProfileHeader from '../profile-header/profile-header';
import Navbar_Links from './navbar-links';
import logo from '../../assets/temp-logo.png';
import NavbarFooter from './navbar-footer';
import HamburgerBtn from '../Hamburger-btn/hamburger-btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faCalendarDays, faHouse, faAlignLeft } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isCollapsed, toggleNavbar }) => {
  return (
    <div className={`navbar ${isCollapsed ? 'open' : 'collapsed'}`}>
      {/* <img src={logo} alt="logo" className={isCollapsed ? 'logo' : 'logo-collapsed'} style={{ marginTop: '0.5rem', marginBottom: '2rem' }} /> */}
     <img src={logo} className={isCollapsed ? 'logo' : 'logo-collapsed'} alt="logo" height={64} width={64}/>
      <ProfileHeader isCollapsed={isCollapsed} />
        <div className="navbar-links-wrapper">
            <div onClick={toggleNavbar}>
                <HamburgerBtn isCollapsed={isCollapsed} />
            </div>
            <a className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`} href='/'>
                <FontAwesomeIcon icon={faHouse} />{isCollapsed && ' Dashboard'}
            </a>
            <a className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`} href='/calendar'>
                <FontAwesomeIcon icon={faCalendarDays} />{isCollapsed && ' Calendar'}
            </a>
            <a className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed  '}`} href='#messaging'>
                <FontAwesomeIcon icon={faMessage} />{isCollapsed && ' Messaging'}
            </a>  
            <a className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`} href='#Forms'>
                <FontAwesomeIcon icon={faAlignLeft} />{isCollapsed && ' Forms'}
            </a>
        </div>

      <NavbarFooter isCollapsed={isCollapsed} />
    </div>
  );
};

export default Navbar;
