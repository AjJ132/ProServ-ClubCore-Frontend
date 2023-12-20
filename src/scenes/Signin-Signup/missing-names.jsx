import React, { useState } from 'react';
import './Signin-Signup.css';
import logo from '../../assets/ProServ-logos/ProServ-logo-upscale.png';
import { signin_service } from '../../services/signin-api-service';

const Missing_Names = ( {userEmail} ) => {
    // State variables
    const [name, setName] = useState('');

    const handleInfoUpdate = async () => {
    };

    return (
        <div className='login-page'>
            <div className="login-modal">
            <div className="flex flex-row content-center justify-start gap-2 w-full pb-8">
                <img src={logo} alt="logo" width={50}/>
                <h1>ProServ</h1>
            </div>

            <div className="flex flex-row content-center justify-start gap-2 w-full pt-8">
                <h2>Lets get some info first!</h2>
            </div>  
            <div className="flex flex-col content-center justify-start gap-0 w-full pt-8">
                <p>First Name<strong>*</strong></p>
                <input type="text" placeholder="First Name" className="login-input" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full pt-6">
                <p>Last Name<strong>*</strong></p>
                <input type="text" placeholder="Last Name" className="login-input" onChange={(e) => setPassword(e.target.value)} />
            </div>


            <div className="flex flex-row content-center justify-start gap-2 w-full pt-8">
                <h3>Already have a team code?</h3>
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full pt-6">
                <p>Team Code (optional)</p>
                <input type="text" placeholder="Ex: (ABC123)" className="login-input" onChange={(e) => setPassword(e.target.value)} />
            </div>  


            

            <div className="flex flex-row content-center justify-center gap-2 w-full pt-14">
                <button className="login-btn" onClick={handleInfoUpdate}>Update</button>
            </div>

        </div>
    </div>
    );
};

export default Missing_Names;
