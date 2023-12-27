import React, { useState, useEffect } from "react";
import './Signin-Signup.css';
import logo from '../../assets/ProServ-logos/ProServ-logo-upscale.png';
import { assign_missing_user_names } from '../../services/signin-api-service';
import {useNavigate} from 'react-router-dom';

const Missing_Names = () => {
    // State variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [teamCode, setTeamCode] = useState('');

    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);
    

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');   

    const handleInfoUpdate = async () => {
        //check if the first and last name fields are filled out
        if (!firstName || !lastName) {
            setModalMessage('First and last name fields are required.');
            setShowModal(true);
            return;
        }   

       

        //check if the team code is valid
        if (teamCode) {
            //check if the team code is valid
            if (teamCode.length !== 6) {
                setModalMessage('Invalid team code. Team codes are 6 characters long and consist of letters and numbers.');
                setShowModal(true);
                return;
            }
        }

        console.log('email:', email);
        console.log('firstName:', firstName);
        console.log('lastName:', lastName);
        console.log('teamCode:', teamCode);

        try{
            const response = await assign_missing_user_names(email, firstName, lastName, teamCode);

            if (response) {
                console.log('Info update successful:', response);
                sessionStorage.removeItem('email');
                navigate('/');

            } else {
                console.log('Info update failed:', response);
                setModalMessage('Info update failed. Please try again later or contact support.');
                setShowModal(true);
            }
        }
        catch(error){
            console.error(error);
        }
       
    };

    return (
        <div className='login-page'>
            {showModal && 
                <>
                    <div className="overlay"></div>
                    <div className="duplicate-email-modal">
                        <p>{modalMessage}</p>
                        <button onClick={() => setShowModal(false)}>Ok!</button>
                    </div>
                </>
            }
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
                <input type="text" placeholder="First Name" className="login-input" onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full pt-6">
                <p>Last Name<strong>*</strong></p>
                <input type="text" placeholder="Last Name" className="login-input" onChange={(e) => setLastName(e.target.value)} />
            </div>


            <div className="flex flex-row content-center justify-start gap-2 w-full pt-8">
                <h3>Already have a team code?</h3>
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full pt-6">
                <p>Team Code (optional)</p>
                <input type="text" placeholder="Ex: (ABC123)" className="login-input" onChange={(e) => setTeamCode(e.target.value)} />
            </div>  


            

            <div className="flex flex-row content-center justify-center gap-2 w-full pt-14">
                <button className="login-btn" onClick={handleInfoUpdate}>Update</button>
            </div>

        </div>
    </div>
    );
};

export default Missing_Names;
