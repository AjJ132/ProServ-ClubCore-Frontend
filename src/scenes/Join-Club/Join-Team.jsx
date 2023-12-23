import React, { useState } from 'react';
import './Join-Team.css';
import '../Signin-Signup/Signin-Signup.css';
import logo from '../../assets/ProServ-logos/ProServ-logo-upscale.png';
import pvatl from '../../assets/pvatl.png';
import { team_lookup } from '../../services/user-info-service';


const JoinTeam = () => {
    const [teamCode, setTeamCode] = useState('');
    const [teamID, setTeamID] = useState(''); 
    const [teamName, setTeamName] = useState('');
    const [teamLocation, setTeamLocation] = useState('');

    const [teamCardErrorMessage, setTeamCardErrorMessage] = useState('');
    const [showCard, setShowCard] = useState(false);

    //search for team
    const handleTeamSearch = () => {
        //validate team code is 6 characters long
        if (teamCode.length !== 6) {
            alert('Team code must be 6 characters long');
            return;
        }

        //search for team
        var response = team_lookup(teamCode);
        
        if (response) {
            console.log('Team found:', response);
            setTeamID(response.Team_ID);
            setTeamName(response.Team_Name);
            setTeamLocation(response.Team_Location);

            setTeamCardErrorMessage('No team selected');
            
            setShowCard(true);
        }else{
            console.log('Team not found');
            setTeamCardErrorMessage('Team not found');

            setShowCard(false);
        }


    };
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
                    <div className="team-card mt-8">
                        <div className="team-card-image">
                            <img src={pvatl} alt="logo" width={150}/>
                        </div>
                        <div className="line-divider mt-4 mb-2"></div>
                        <div className="flex flex-col content-center justify-center gap-0 w-full mt-4">
                            <h3>Pole Vault Atlanta</h3>
                            <p>Atlanta, GA</p>
                        </div>
                        <div className="flex flex-row content-center justify-center gap-2 w-full mt-6">
                            <button>Join</button>
                        </div>
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
