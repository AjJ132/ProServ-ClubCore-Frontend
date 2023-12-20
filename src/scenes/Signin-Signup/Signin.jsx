import React, {useState} from 'react';
import './Signin-Signup.css'
import logo from '../../assets/ProServ-logos/ProServ-logo-upscale.png';
import { signin_service } from '../../services/signin-api-service';


const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await signin_service(username, password);

            //print value of response to console
            console.log(response);

            if (response) {
                console.log('Login successful:', response);
            } else {
                console.log('Login failed:', response);
            }
        } catch (error) {
            //print error to console
            console.error(error);
        }
    };


    return (
        <div className='login-page'>
            <div className="login-modal">
                <div className="flex flex-row content-center justify-start gap-2 w-full pb-8">
                    <img src={logo} alt="logo" width={50}/>
                    <h1>ProServ</h1>
                </div>

                <div className="flex flex-row content-center justify-start gap-2 w-full pt-8">
                    <h2>Sign In</h2>
                </div>  
                <div className="flex flex-col content-center justify-start gap-0 w-full pt-8">
                    <p>Email<strong>*</strong></p>
                    <input type="text" placeholder="Email" className="login-input" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="flex flex-col content-center justify-start gap-0 w-full pt-6">
                    <p>Password<strong>*</strong></p>
                    <input type="password" placeholder="Password" className="login-input" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="flex flex-row content-center justify-start gap-2 w-full pt-2">
                    <p>Forgot password? <a href="/forgot-password">Reset Password</a></p>
                </div>

                <div className="flex flex-row content-center justify-start gap-2 w-full pt-4">
                    <p>Keep me signed in</p>
                    <input type="checkbox" className="test"/>
                </div>


                <div className="flex flex-row content-center justify-center gap-2 w-full pt-14">
                    <button className="login-btn" onClick={handleLogin}>Sign In</button>
                </div>

               

                <div className="flex flex-row content-center justify-center gap-2 w-full pt-14">
                    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                </div>

                
                
            </div>
        </div>
    );
};

export default Signin;
