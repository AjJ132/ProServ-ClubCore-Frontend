//Service for signin and signup operations
const API_URL = import.meta.env.VITE_ClubCore_Server_API;
import { http_context } from './http-context.js';

export const dev_create_test_data = async () => {
    try {
        const response = await http_context(`${API_URL}/dev/generate-test-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('There was a problem with the dev operation:', error);
        throw error;
    }
};

export const dev_test_authentication = async () => {
    try {
        const response = await http_context(`${API_URL}/dev/test-authentication`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('There was a problem with the dev operation:', error);
        throw error;
    }
};

export const dev_remove_message_data = async () => {
    try {
        const response = await http_context(`${API_URL}/dev/remove-all-message-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('There was a problem with the dev operation:', error);
        throw error;
    }
}