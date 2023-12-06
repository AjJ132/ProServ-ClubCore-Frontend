// src/components/Dashboard/Dashboard.jsx

import React from 'react';
import Navbar from '../../components/navbar/navbar';
import './Dashboard.css';

const Dashboard = ({ isCollapsed }) => {
  return (
    <div className={`dashboard-wrapper ${isCollapsed ? 'expanded' : 'collapsed'}`}>
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
