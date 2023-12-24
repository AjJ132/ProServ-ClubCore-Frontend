import React, { useEffect, useState } from 'react';
import './settings.css';
import { update_user_names } from '../../services/user-info-service';
import {useNavigate} from 'react-router-dom';
import TeamCard from '../../components/team-card/team-card';
import { get_team_location } from '../../services/team-info-service';

const Settings = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isInTeam, setIsInTeam] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [teamLocation, setTeamLocation] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const get_user_info = async () => {
            //Gather info for settings page
            setIsInTeam(localStorage.getItem('isInTeam'));

            if (isInTeam) {
                var tN = await localStorage.getItem('team_name');
                setTeamName(tN); //P3 awful code. Optimize later
            }   

            setFirstName(localStorage.getItem('first_name'));
            setLastName(localStorage.getItem('last_name'));
            setEmail(localStorage.getItem('email'));

            var loc = await get_team_location();

            var locStor = localStorage.getItem('team_location');

            if (locStor !== loc) {
                localStorage.setItem('team_location', loc);
            };

            setTeamLocation(loc);
        };

        get_user_info();
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

    const joinTeam = () => {
        //redirect to join club page
        navigate('/join-team');
    };

    const leaveTeam = () => {
        navigate('/leave-team');
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
                <div className="settings-section section-border mb-8 ">
                    <h2>Team</h2>
                    <p>Manage all team information</p>

                    <div className="w-1/2">
                        {!isInTeam ? (
                            <div className="flex flex-row gap-4 justify-start items-center mt-4">
                                <h4 className="">It appears you are not apart of a group yet. Would you like to join one?</h4>
                                <button onClick={joinTeam}>Join Team</button>
                            </div>
                        ) : (
                            <TeamCard teamName={teamName} teamLocation={teamLocation} onJoinClick={leaveTeam} joining={false}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;