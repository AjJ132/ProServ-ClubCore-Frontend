// src/components/Navbar/Navbar.jsx

import React from 'react';
import './Navbar.css';
import ProfileHeader from '../profile-header/profile-header';
import Navbar_Links from './navbar-links';
import logo from '../../assets/ks-logo.png';
import NavbarFooter from './navbar-footer';
import HamburgerBtn from '../Hamburger-btn/hamburger-btn';

const Navbar = ({ isCollapsed, toggleNavbar }) => {
  return (
    <nav className={`navbar ${isCollapsed ? 'open' : 'collapsed'}`}>
      <img src={logo} alt="logo" className={isCollapsed ? 'logo' : 'logo-collapsed'} style={{ marginTop: '0.5rem', marginBottom: '2rem' }} />

      <ProfileHeader isCollapsed={isCollapsed} />

      <div className="mt-8 h-full w-full flex flex-col justify-between">
        <div>
          <div className="navbar-header" onClick={toggleNavbar}>
            <HamburgerBtn isCollapsed={isCollapsed} />
          </div>
          <Navbar_Links isCollapsed={isCollapsed} />
        </div>
        <NavbarFooter isCollapsed={isCollapsed} />
      </div>
    </nav>
  );
};

export default Navbar;
