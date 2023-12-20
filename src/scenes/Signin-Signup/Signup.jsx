import React, {useState} from 'react';
import './Signin-Signup.css'
import logo from '../../assets/ProServ-logos/ProServ-logo-upscale.png';
import { signup_service } from '../../services/signin-api-service';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirm] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');   

    const navigate = useNavigate();

    const emailRegex = /^\S+@\S+\.\S+$/;
        const passwordRegex = /^[a-zA-Z0-9]{8,}$/;

        const [password, setPassword] = useState('');
        const [lengthValid, setLengthValid] = useState(false);
        const [lowercaseValid, setLowercaseValid] = useState(false);
        const [uppercaseValid, setUppercaseValid] = useState(false);
        const [numberValid, setNumberValid] = useState(false);
        const [passwordsMatch, setPasswordsMatch] = useState(false);

        const handlePasswordChange = (e) => {
            const value = e.target.value;
            setPassword(value);
            setLengthValid(value.length >= 8);
            setLowercaseValid(/[a-z]/.test(value));
            setUppercaseValid(/[A-Z]/.test(value));
            setNumberValid(/\d/.test(value));

            // If the confirm password field is filled out, check if the passwords match
            if (confirmPassword) {
                setPasswordsMatch(value === confirmPassword);
            }

            handleConfirmPasswordChange(e);
        };

        const handleConfirmPasswordChange = (e) => {
            const value = e.target.value;
            setConfirm(value);
            setPasswordsMatch(value === password);
        };

    const handleSignup = async () => {

        if (!username || !password || !confirmPassword) {
            setModalMessage('Email and password fields are required.');
            setShowModal(true);
            return;
        }
    
        if (!emailRegex.test(username)) {
            setModalMessage('Invalid email format.');
            setShowModal(true);
            return;
        }
    
        if (!passwordRegex.test(password)) {
            setModalMessage('Invalid password. Passwords must contain at least one lowercase letter, one uppercase letter, and one number');
            setShowModal(true);
            return;
        }
    
        if (password !== confirmPassword) {
            setModalMessage('Password and confirm password do not match.');
            setShowModal(true);
            return;
        }

        try {
            const response = await signup_service(username, password, confirmPassword);
    
            // Check for specific response scenarios
            if (response && response.status === 200) {
                const token = response.data.token; // Adjust this based on your response structure

                // Set the cookie
                document.cookie = `authToken=${token}; path=/; max-age=3600; secure; HttpOnly`;

                console.log('Login successful:', response);

                // Redirect the user to the page to collect their name and team code
                navigate('/update-names');
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
                        <p>{modalMessage}</p>
                        <button onClick={() => setShowModal(false)}>Ok!</button>
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
                    <p>Email<strong>*</strong></p>
                    <input type="text" placeholder="Email" className="login-input" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="flex flex-col content-center justify-start gap-0 w-full pt-6">
                    <p>Password<strong>*</strong></p>
                    <input type="password" placeholder="Password" className="login-input" onChange={handlePasswordChange}/>
                </div>
                <div className="flex flex-row content-center justify-start gap-2 w-full pt-2">
                    <ul className="flex flex-col content-center justify-start gap-2 w-full pt-2" style={{ listStyleType: 'disc' }}>
                        <li style={{ color: lengthValid ? 'green' : 'gray' }}>At least 8 characters</li>
                        <li style={{ color: lowercaseValid ? 'green' : 'gray' }}>Contains lowercase letter</li>
                        <li style={{ color: uppercaseValid ? 'green' : 'gray' }}>Contains uppercase letter</li>
                        <li style={{ color: numberValid ? 'green' : 'gray' }}>Contains a number</li>
                    </ul>
                </div>

                <div className="flex flex-col content-center justify-start gap-0 w-full pt-6">
                    <p>Confirm Password<strong>*</strong></p>
                    <input type="password" placeholder="Confirm Password" className="login-input" onChange={handleConfirmPasswordChange}/>
                </div>

                <div className="flex flex-row content-center justify-start gap-2 w-full pt-2">
                    <ul className="flex flex-col content-center justify-start gap-2 w-full pt-2" style={{ listStyleType: 'disc' }}>
                        <li style={{ color: passwordsMatch ? 'green' : 'gray' }}>Passwords match</li>
                    </ul>
                </div>

                {/* <div className="flex flex-col content-center justify-start gap-0 w-full pt-6">
                    <p>Team Code (Optional)</p>
                    <input type="password" placeholder="Team Code Ex: (ABCD123)" className="login-input" onChange={(e) => setTeamCode(e.target.value)}/>
                </div> */}

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
