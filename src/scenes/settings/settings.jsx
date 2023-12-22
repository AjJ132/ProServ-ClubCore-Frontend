import React, { useEffect, useState } from 'react';
import './settings.css';
import { update_user_names } from '../../services/user-info-service';

const Settings = () => {
    const [inClub, setInClub] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [clubId, setClubId] = useState('');
    const [clubName, setClubName] = useState('');

    useEffect(() => {
        //Gather info for settings page
        setClubId(localStorage.getItem('club_id'));

        if (clubId !== '') {
            setInClub(true);
        }else{
            setInClub(false);
        }

        setClubName(localStorage.getItem('club_name'));
        setFirstName(localStorage.getItem('first_name'));
        setLastName(localStorage.getItem('last_name'));
        setEmail(localStorage.getItem('email'));
    }, []);

    const updateNames = async () => {
        //check names are not empty
        if (firstName === '' || lastName === '') {
            alert('First and last name cannot be empty');
            return;
        }

        //update names
        var response = await update_user_names(firstName, lastName);

        if (response) {
            console.log('Names updated');
        }else{
            alert('There was an error updating your names. Please try again later.');
        }



    };

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
                        <input type="text" placeholder="First Name" value={firstName} className="mt-4" onChange={(e) => setFirstName(e.target.value)}/>
                    </div>

                    <div className="settings-field">
                        <h3>Last Name</h3>
                        <div className="line-divider"></div>
                        <input type="text" placeholder="Last Name" value={lastName} className="mt-4" onChange={(e) => setLastName(e.target.value)}/>
                    </div>

                    <button className="mt-4" onClick={updateNames}>Update</button>
                </div>

                <div className="settings-section section-border">
                    <h2>Account Settings</h2>
                    <p>Manage all login information</p>

                    <div className="settings-field">
                        <h3>Email</h3>
                        <div className="line-divider"></div>
                        <input type="text" placeholder="Email" value={email} className="mt-4" onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <button className="mt-2 mb-6">Update</button>

                    <div className="settings-field">
                        <h3>Password</h3>
                        <div className="line-divider"></div>
                        <button className="mt-4">Change Password</button>
                    </div>
                </div>
                <div className="settings-section section-border">
                    <h2>Club</h2>
                    <p>Manage all club information</p>

                    {!inClub ? (
                        <p>it appears you are not in a club at this moment</p>
                    ) : (
                        <div className="settings-field">
                            <h3>Club Name</h3>
                            <div className="line-divider"></div>
                            <input type="text" placeholder="Club Name" value={clubName} className="mt-4" onChange={(e) => setClubName(e.target.value)}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;