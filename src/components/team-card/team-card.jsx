import React from "react";
import pvatl from '../../assets/pvatl.png';
import { useNavigate } from "react-router-dom";
import './team-card.css';

function TeamCard ({teamName, teamLocation,onJoinClick , joining}){
    return(
        <div className="team-card mt-8">
            <div className="team-card-image">
                <img src={pvatl} alt="logo" width={150}/>
            </div>
            <div className="line-divider mt-4 mb-2"></div>
            <div className="flex flex-col content-center justify-center gap-0 w-full mt-4">
                <h3>{teamName}</h3>
                <p>{teamLocation}</p>
            </div>
            <div className="flex flex-row content-center justify-center gap-2 w-full mt-6">
                {joining ? <button onClick={onJoinClick}>Join</button> : <button className="leave-team-button" onClick={onJoinClick}>Leave</button>}
            </div>
        </div>
    )
};

export default TeamCard;