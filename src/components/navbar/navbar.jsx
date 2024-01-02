// src/components/Navbar/Navbar.jsx

import React from 'react';
import './Navbar.css';
import ProfileHeader from '../profile-header/profile-header';
import logo from '../../assets/temp-logo.png';
import NavbarFooter from './navbar-footer';
import { Link } from 'react-router-dom';
import HamburgerBtn from '../Hamburger-btn/hamburger-btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faCalendarDays, faHouse } from '@fortawesome/free-solid-svg-icons';
import { test_api, validate_session } from '../../services/signin-api-service';
import { dev_test_authentication } from '../../services/dev-service';
//P3 remove all test code


const Navbar = ({ isCollapsed, toggleNavbar, collapseNavbar }) => {

    const handleTest = async () => {
        console.log('test');
        const response = await validate_session ();

        if (response) {
            console.log('Session valid:', response);
        }else{
            console.log('Session invalid. Please login.');
        }
    };

    const handleTestAuthenticationClick = async () => {
        console.log('test authentication');
        const response = await dev_test_authentication();

        if (response === true) {
            alert('Success');
        }else{
            alert('Failure');
        }
    }

  return (
    <div className={`navbar ${isCollapsed ? 'open' : 'collapsed'}`}>
     <img src={logo} className={isCollapsed ? 'logo' : 'logo-collapsed'} alt="logo" height={64} width={64}/>
      <ProfileHeader isCollapsed={isCollapsed} />
        <div className="navbar-links-wrapper">
            <div onClick={toggleNavbar}>
                <HamburgerBtn isCollapsed={isCollapsed} />
            </div>
            <Link onClick={collapseNavbar}
                  to="/" 
                  className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`}
              >
                  <FontAwesomeIcon icon={faHouse} />
                  {isCollapsed && ' Dashboard'}
              </Link>
              <Link onClick={collapseNavbar}
                  to="/calendar" 
                  className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`}
              >
                  <FontAwesomeIcon icon={faCalendarDays} />
                  {isCollapsed && ' Calendar'}
              </Link>

              <Link onClick={collapseNavbar}
                  to="/messages" 
                  className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`}
              >
                  <FontAwesomeIcon icon={faMessage} />
                  {isCollapsed && ' Messages'}
              </Link>
              <button onClick={handleTestAuthenticationClick}
                  className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`}
              >
                  {/* <FontAwesomeIcon icon={faDev} /> */}
                  {isCollapsed && ' DEV_AUTHENTICATION'}
              </button>
              
        </div>

      <NavbarFooter isCollapsed={isCollapsed} />
    </div>
  );
};

export default Navbar;
