// src/components/Dashboard/Dashboard.jsx

import React from 'react';
import Navbar from '../../components/navbar/navbar';
import './Dashboard.css';

const Dashboard = ({ isCollapsed }) => {
  return (
    <div className={`dashboard-wrapper ${isCollapsed ? 'expanded' : 'collapsed'}`}>
      <div className="dashboard-content">
        <div className="vertical-container">
          <div className="horizontal-stack bg-red-100" >
            <h1>Dashboard</h1>
            <div>
              <p>H</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
