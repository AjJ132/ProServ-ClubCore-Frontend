//Service for signin and signup operations
const API_URL = import.meta.env.VITE_ClubCore_Server_API;

export const signin_service = async (username, password) => {
    try {
        //print address to console
        console.log(`${API_URL}/signin`);

        const response = await fetch(`${API_URL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            throw new Error('--');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

export const signup_service = async (username, password, teamCode) => {
    try {
        console.log(`${API_URL}/signup`);

        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, teamCode })
        });

        if (response.status === 409) {
            console.log('Username already exists');
            return { success: false, message: 'Username already exists' };
        }

        if (!response.ok) {
            console.log('Network response was not ok');
            throw new Error('Network response was not ok');
        }

        console.log('Signup successful');
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};






