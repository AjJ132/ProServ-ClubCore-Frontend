const API_URL = import.meta.env.VITE_ClubCore_Server_API;
import { http_context } from './http-context.js';

export const check_session_storage = async () => {
    try {
        //check isInTeam, team_location, last_name, first_name, email, team_name, user_id
        //if any are missing, return false
        if (sessionStorage.getItem('isInTeam') === null || sessionStorage.getItem('team_location') === null || sessionStorage.getItem('last_name') === null || sessionStorage.getItem('first_name') === null || sessionStorage.getItem('email') === null || sessionStorage.getItem('team_name') === null || sessionStorage.getItem('user_ID') === null) {
            return false;
        }

        //if all are present, return true
        return true;
        
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

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
            return false;
        }

        //Get first name, last name, email, club id, and club name from response
        //Save to local storage
        const data = await response.json();

        sessionStorage.setItem('user_ID', data.user_ID);
        sessionStorage.setItem('first_name', data.first_Name);
        sessionStorage.setItem('last_name', data.last_Name);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('team_name', data.team_Name);
        sessionStorage.setItem('isInTeam', data.isInTeam);
        
        //return first, last names and club name
        return true;
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
        sessionStorage.setItem('first_name', First_Name);
        sessionStorage.setItem('last_name', Last_Name);
        
        //retur first, last names and club name
        return true;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export const team_lookup = async (team_code) => {
    try {
        const response = await http_context(`${API_URL}/team/team-lookup?Team_Join_Code=${encodeURIComponent(team_code)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },  
            credentials: 'include'
        });

        if (!response.ok) {
            return false;
        }
        //return data
        const data = await response.json();
        return {success: true, data: data};


    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export const join_team = async (team_code) => {
    try {
        const response = await http_context(`${API_URL}/team/join-team?Team_Join_Code=${encodeURIComponent(team_code)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },  
            credentials: 'include'
        });

        if (!response.ok) {
            return false;
        }

        //prefetch team data to be stored in local storage //P3 //README not sure if I even need this


        return true;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}