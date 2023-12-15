// src/components/Dashboard/Dashboard.jsx

import React from 'react';
import Navbar from '../../components/navbar/navbar';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faMessage } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ isCollapsed }) => {
  // Create a new Date object for the current date
  const currentDate = new Date();

  // Options for formatting the date
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Format the date into a human-readable string
  const dateString = currentDate.toLocaleDateString('en-US', dateOptions);

  return (
    <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="line-divider mt-4"></div>
        </div>
        
        <div className="dashboard-tab">
          <div className="dashboard-body">
            <div className='action-header section-border'>
              <div className="flex justify-between items-center w-full">
                <h2>
                  Welcome back, AJ Johnson
                </h2>
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <h3>
                    {dateString} {/* Insert the formatted date string here */}
                  </h3>
                </div>
              </div>
              <div class="flex flex-row justify-start w-full gap-4">
                <button class="button button-secondary flex flex-row items-center gap-1">
                  <FontAwesomeIcon icon={faMessage} />
                  Send Message
                </button>
                <button class="button button-secondary flex flex-row items-center gap-1">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  Add Event
                </button>
              </div>
            </div>
            <div className="dashboard-quick-info">
              <div className="quick-info-column ">
                <div className="section-border flex flex-col items-center gap-4 w-full p-4">
                  <div className="flex flex-row items-start justify-between gap-2 w-full">
                    <h2>My Schedule</h2>
                    <a>See All</a>
                  </div>
                  <h3>No Events Today</h3>
                </div>
              </div>
              <div className="quick-info-column section-border feed-widget">
              </div>
              <div className="quick-info-column section-border ">
                <h2>Messages</h2>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
