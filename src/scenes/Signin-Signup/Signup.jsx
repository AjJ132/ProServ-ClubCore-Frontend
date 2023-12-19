import React, {useState} from 'react';
import './Signin-Signup.css'
import logo from '../../assets/ProServ-logos/ProServ-logo-upscale.png';
import { signup_service } from '../../services/signin-api-service';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirm] = useState('');
    const [teamCode, setTeamCode] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');   

    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await signup_service(username, password, teamCode);
    
            // Check for specific response scenarios
            if (response && response.status === 200) {
                const token = response.data.token; // Adjust this based on your response structure

                // Set the cookie
                document.cookie = `authToken=${token}; path=/; max-age=3600; secure; HttpOnly`;

                console.log('Login successful:', response);

                // Redirect the user to the dashboard
                navigate('/');
            } else if (response && response.status === 409) {
            
                console.log('Username already exists:', response);
                // Display error message to the user on the frontend
                setModalMessage('Email already exists. Please try another one.');
                setShowModal(true);
                
            } else {
                console.log('Login failed:', response);
            }
        } catch (error) {
            console.error('Caught Login error:', error);
        }

        console.log("Ending handleSignup");
    };
    
    return (
        <div className='login-page register-page'>
            {showModal && 
                <>
                    <div className="overlay"></div>
                    <div className="duplicate-email-modal">
                        <p>Email already exists. Please try another one or <a href="/signin">Sign In</a></p>
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </>
            }
            <div className="login-modal register-modal">
                <div className="flex flex-row content-center justify-start gap-2 w-full pb-8">
                    <img src={logo} alt="logo" width={50}/>
                    <h1>ProServ</h1>
                </div>

                <div className="flex flex-row content-center justify-start gap-2 w-full pt-8">
                    <h2>Sign Up</h2>
                </div>
                <div className="flex flex-col content-center justify-start gap-0 w-full pt-8">
                    <p>Email</p>
                    <input type="text" placeholder="Email" className="login-input" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="flex flex-col content-center justify-start gap-0 w-full pt-6">
                    <p>Password</p>
                    <input type="password" placeholder="Password" className="login-input" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="flex flex-col content-center justify-start gap-0 w-full pt-6">
                    <p>Confirm Password</p>
                    <input type="password" placeholder="Confirm Password" className="login-input"/>
                </div>

                <div className="flex flex-col content-center justify-start gap-0 w-full pt-6">
                    <p>Team Code (Optional)</p>
                    <input type="password" placeholder="Team Code Ex: (ABCD123)" className="login-input" onChange={(e) => setTeamCode(e.target.value)}/>
                </div>

                <div className="flex flex-row content-center justify-center gap-2 w-full pt-14">
                    <button className="login-btn" onClick={handleSignup}>Sign Up</button>
                </div>

               

                <div className="flex flex-row content-center justify-center gap-2 w-full pt-14">
                    <p>Already have an account? <a href="/signin">Sign In</a></p>
                </div>

                
                
            </div>
        </div>
    );
};

export default Signup;
