

//Service for signin and signup operations
const API_URL = import.meta.env.VITE_ClubCore_Server_API;
import { http_context } from './http-context.js';

export const signin_service = async (email, password) => {
    try {
        const response = await http_context(`${API_URL}/login?useCookies=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const signup_service = async (email, password) => {
    try {

        const response = await http_context(`${API_URL}/register`, {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({ email, password})
        });

        if (response.status === 409) {
            console.log('Username already exists');
            return 409;
        }

        if (!response.ok) {
            console.log('Network response was not ok');
            throw new Error('Network response was not ok');
        }

        return 200;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const assign_missing_user_names = async (Email, FirstName, LastName, TeamCode) => {
    try{
        const response = await http_context(`${API_URL}/Auth/update-user-info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ Email, FirstName, LastName, TeamCode})
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return true;

    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const validate_session = async () => {
    try{
        const API_URL = import.meta.env.VITE_ClubCore_Server_API;
        const response = await http_context(`${API_URL}/auth/validate-session`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });

        if (!response.ok) {
            return false;
        }

        return true;
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
        return false;
    }
}


export const test_api = async () => {
    try {
        const response = await http_context(`${API_URL}/WeatherForecast`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (!response.ok) {
            console.log('Network response was not ok');
            return false;
        }
        console.log("Success");
        return true;
    } catch (error) {
        console.error('There was a problem with the test fetch operation:', error);
        throw error;
    }
}







