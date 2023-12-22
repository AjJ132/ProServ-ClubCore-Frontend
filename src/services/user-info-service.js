const API_URL = import.meta.env.VITE_ClubCore_Server_API;
import { http_context } from './http-context.js';

export const get_user_info = async () => {
    try {
        const response = await http_context(`${API_URL}/Users/get-user-info`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },  
            credentials: 'include',
        });
        if (!response.ok) {
            return;
        }

        //Get first name, last name, email, club id, and club name from response
        //Save to local storage
        const data = await response.json();

        localStorage.setItem('first_name', data.first_Name);
        localStorage.setItem('last_name', data.last_Name);
        localStorage.setItem('email', data.email);
        localStorage.setItem('club_id', data.club_ID);
        localStorage.setItem('club_name', data.club_Name);
        
        //retur first, last names and club name
        return;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const update_user_names = async (First_Name, Last_Name) => {
    try {
        const response = await http_context(`${API_URL}/Users/update-users-names`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },  
            credentials: 'include',
            body: JSON.stringify({
                email: "",
                first_name: First_Name,
                last_name: Last_Name,
                club_id: "",
                club_name: ""
            })
        });
        if (!response.ok) {
            return false;
        }

        //save new names to local storage
        localStorage.setItem('first_name', First_Name);
        localStorage.setItem('last_name', Last_Name);
        
        //retur first, last names and club name
        return true;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}