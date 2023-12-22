// src/components/Navbar/Navbar.jsx

import React from 'react';
import './Navbar.css';
import ProfileHeader from '../profile-header/profile-header';
import Navbar_Links from './navbar-links';
import logo from '../../assets/temp-logo.png';
import NavbarFooter from './navbar-footer';
import { Link } from 'react-router-dom';
import HamburgerBtn from '../Hamburger-btn/hamburger-btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faCalendarDays, faHouse, faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { test_api, validate_session } from '../../services/signin-api-service';
//TODO remove all test code


const Navbar = ({ isCollapsed, toggleNavbar }) => {

    const handleTest = async () => {
        console.log('test');
        const response = await validate_session ();

        if (response) {
            console.log('Session valid:', response);
        }else{
            console.log('Session invalid. Please login.');
        }
    };

  return (
    <div className={`navbar ${isCollapsed ? 'open' : 'collapsed'}`}>
      {/* <img src={logo} alt="logo" className={isCollapsed ? 'logo' : 'logo-collapsed'} style={{ marginTop: '0.5rem', marginBottom: '2rem' }} /> */}
     <img src={logo} className={isCollapsed ? 'logo' : 'logo-collapsed'} alt="logo" height={64} width={64}/>
      <ProfileHeader isCollapsed={isCollapsed} />
        <div className="navbar-links-wrapper">
            <div onClick={toggleNavbar}>
                <HamburgerBtn isCollapsed={isCollapsed} />
            </div>
            <Link 
                  to="/" 
                  className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`}
              >
                  <FontAwesomeIcon icon={faHouse} />
                  {isCollapsed && ' Dashboard'}
              </Link>
              <Link 
                  to="/calendar" 
                  className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`}
              >
                  <FontAwesomeIcon icon={faCalendarDays} />
                  {isCollapsed && ' Calendar'}
              </Link>

            <a className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed  '}`} href='#messaging'>
                <FontAwesomeIcon icon={faMessage} />{isCollapsed && ' Messaging'}
            </a>  
            <Link 
                  to="/signin" 
                  className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`}
              >
                  <FontAwesomeIcon icon={faCalendarDays} />
                  {isCollapsed && ' Signin'}
              </Link>
              <Link 
                  to="/signup" 
                  className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`}
              >
                  <FontAwesomeIcon icon={faCalendarDays} />
                  {isCollapsed && ' Signup'}
              </Link>
              <Link 
                  to="/update-names" 
                  className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`}
              >
                  <FontAwesomeIcon icon={faCalendarDays} />
                  {isCollapsed && ' Missing Names'}
              </Link>
              <button className={`navbar-links-wrapper-btn ${isCollapsed ? 'open' : 'collapsed'}`} onClick={handleTest}>
                    <FontAwesomeIcon icon={faAlignLeft} />
                    {isCollapsed && ' Test'}
                </button>   
        </div>

      <NavbarFooter isCollapsed={isCollapsed} />
    </div>
  );
};

export default Navbar;
