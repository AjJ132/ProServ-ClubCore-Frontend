const API_URL = import.meta.env.VITE_ClubCore_Server_API;
import { http_context } from './http-context.js';

export const get_users_to_message = async () => {
    try {
        const response = await http_context(`${API_URL}/message/get-users-to-message`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (!response.ok) {
            return false;
        }

        const data = await response.json();


        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const get_users_to_message_filtered = async (searchTerm) => {
    try {
        const response = await http_context(`${API_URL}/message/get-users-to-message`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (!response.ok) {
            return;
        }

        const data = await response.json();
        const users = data.users;

        return users;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};


export const create_direct_message_thread = async (User2_ID) => {  
    try {
        const response = await http_context(`${API_URL}/message/new-direct-message-thread`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },  
            credentials: 'include',
            body: JSON.stringify({User2_ID}),
        });
        if (!response.ok) {
            return false;
        }

        return true;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export const get_my_message_threads = async () => {
    try {
        const response = await http_context(`${API_URL}/message/get-my-message-threads`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (!response.ok) {
            return false;
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const get_messages_for_direct_conversation = async (conversationID, pageIndex, pageSize) => {
    try {
        const response = await http_context(`${API_URL}/Message/Direct/${conversationID}/messages?conversationID=${conversationID}&pageIndex=${pageIndex}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (!response.ok) {
            return false;
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

