//Service for signin and signup operations
const API_URL = import.meta.env.VITE_ClubCore_Server_API;

export const signin_service = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
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

export const signup_service = async (email, password, confirmPassword) => {
    try {
        console.log('Confirm password: ', confirmPassword );

        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({ email, password, confirmPassword})
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
        const response = await fetch(`${API_URL}/auth/update-user-info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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






