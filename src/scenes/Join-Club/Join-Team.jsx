import React, { useState } from 'react';
import './Join-Team.css';
import '../Signin-Signup/Signin-Signup.css';
import logo from '../../assets/ProServ-logos/ProServ-logo-upscale.png';
import pvatl from '../../assets/pvatl.png';
import { team_lookup, join_team } from '../../services/user-info-service';
import TeamCard from '../../components/team-card/team-card';


const JoinTeam = () => {
    const [teamCode, setTeamCode] = useState('');
    const [teamName, setTeamName] = useState('');
    const [teamLocation, setTeamLocation] = useState('');
    const [selectedTeamCode, setSelectedTeamCode] = useState('');

    const [teamCardErrorMessage, setTeamCardErrorMessage] = useState('');
    const [showCard, setShowCard] = useState(false);

    //search for team
    const handleTeamSearch =  async () => {
        //validate team code is 6 characters long
        if (teamCode.length !== 6) {
            alert('Please re-enter your team code');
            return;
        }

        //search for team
        var response = await team_lookup(teamCode);
        console.log('Team lookup response:', response);
        console.log('Team lookup response success:', response.success);
        
        if (response.success === true) {
            var data = response.data;
            console.log('Team found:', response);
            setSelectedTeamCode(teamCode);
            setTeamName(data.team_Name);
            setTeamLocation(data.team_Location);

            setTeamCardErrorMessage('No team selected');
            
            setShowCard(true);
        }else{
            console.log('Team not found');
            setTeamCardErrorMessage('Team not found');

            setShowCard(false);
        }
    };

    const handleJoinTeam = async () => {
        //validate team code is 6 characters long
        if (selectedTeamCode.length !== 6) {
            alert('Team code must be 6 characters long');
            return;
        }

        //search for team
        var response = await join_team(teamCode);
        
        if (response === true) {
            console.log('You are now a member of', teamName);
            //redirect back a page
            window.history.back();
        }else{
            alert('There was a problem joining your team. Please try again later or contact support')
        }
    }

    return (
        <div className="login-page">
            <div className="join-team-modal">
                <div className="flex flex-row content-center justify-start gap-2 w-full pb-8">
                    <img src={logo} alt="logo" width={50}/>
                    <h1>ProServ</h1>
                </div>
                <div className="flex flex-row content-center justify-start gap-2 w-full pt-8">
                    <h2>Join Team</h2>
                </div>
                <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>For access to your team, please input the <strong>Team Code</strong> given by your coach or administrator.</p>
                </div>
                <div className="flex flex-row items-end justify-center gap-4 w-full mt-8">
                    <div className="flex flex-col content-center justify-center gap-0 w-full">
                        <p>Team Code<strong>*</strong></p>
                        <input type="text" placeholder="Team Code" className="login-input" onChange={(e) => setTeamCode(e.target.value)} maxLength={6}/>
                    </div>

                    <button onClick={handleTeamSearch}>Search</button>
                </div> 
               {showCard ? (
                    <div className="w-full">
                        <TeamCard
                            teamName={teamName}
                            teamLocation={teamLocation}
                            onJoinClick={handleJoinTeam}
                            joining={true}/>
                </div>
                ) : (
                    <div className="flex flex-col justify-center gap-2 w-full h-full mt-8">
                        <h3 className="w-fit ml-auto mr-auto">{teamCardErrorMessage}</h3>
                    </div>
                )}
                <div className="flex flex-row content-center justify-center gap-2 w-full mt-14">
                    <p>Not seeing your team? <a>Contact support</a></p>
                </div>
            </div>
        </div>
    );
}

export default JoinTeam;
