import React from 'react';
import './settings.css';

const Settings = () => {
    return (
        <div className="page-content">
            <div className="page-header">
                <h1>Settings</h1>
                <div className="line-divider mt-4"></div>
            </div>
            <div className="dashboard-tab flex flex-col gap-4">
                <div className="settings-section section-border">
                    <h2>Personal Information</h2>
                    <p>Manage all your personal information</p>

                    <div className="settings-field">
                        <h3>First Name</h3>
                        <div className="line-divider"></div>
                        <input type="text" placeholder="First Name" className="mt-4"/>
                    </div>

                    <div className="settings-field">
                        <h3>Last Name</h3>
                        <div className="line-divider"></div>
                        <input type="text" placeholder="Last Name" className="mt-4  "/>
                    </div>
                </div>

                <div className="settings-section section-border">
                    <h2>Account Settings</h2>
                    <p>Manage all login information</p>

                    <div className="settings-field">
                        <h3>Email</h3>
                        <div className="line-divider"></div>
                        <input type="text" placeholder="Email" className="mt-4"/>
                    </div>

                    <div className="settings-field">
                        <h3>Password</h3>
                        <div className="line-divider"></div>
                        <button className="mt-4">Change Password</button>
                    </div>
                </div>
                <div className="settings-section section-border">
                    <h2>Club</h2>
                    <p>Manage all club information</p>

                    <p>it appears you are not in a club at this moment</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;