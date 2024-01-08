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

export const get_conversation_members = async (conversationID, conversationType) => {
    try {
        const response = await http_context(`${API_URL}/message/get-conversation-members?conversationID=${conversationID}&conversationType=${conversationType}`, {
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


export const create_direct_message_thread = async (User2_ID) => {  
    try {
        const response = await http_context(`${API_URL}/message/direct/new-direct-message-thread`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },  
            credentials: 'include',
            body: JSON.stringify({User2_ID}),
        });
        if (!response.ok) {
            //check if response says "DC Already Exists"
            if (response.status === 409) {
                return 409;
            }

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

export const send_Direct_Message = async (conversationID, message) => {
    try {
        const response = await http_context(`${API_URL}/Message/Direct/${conversationID}/send-message?conversationID=${conversationID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(message),
        });
        if (!response.ok) {
            return false;
        }

        const data = await response.json();

        return data;

    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export const mark_direct_message_as_read = async (conversation_ID) => {
    try {
        const response = await http_context(`${API_URL}/Message/Direct/${conversation_ID}/mark-as-read?conversationID=${conversation_ID}`, {
            method: 'PUT',
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
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export const create_group_conversation = async (newGroupConversation) => {
    try {
        const response = await http_context(`${API_URL}/message/group/new-group-message-thread`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(newGroupConversation),
        });
        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export const get_messages_for_group_conversation = async (conversationID, pageIndex, pageSize) => {
    try {
        const response = await http_context(`${API_URL}/Message/Group/${conversationID}/messages?conversationID=${conversationID}&pageIndex=${pageIndex}&pageSize=${pageSize}`, {
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

export const send_Group_Message = async (conversationID, message) => {
    try {
        const response = await http_context(`${API_URL}/Message/Group/${conversationID}/send-message?conversationID=${conversationID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(message),
        });
        if (!response.ok) {
            return false;
        }

        const data = await response.json();

        return data;

    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export const mark_group_message_as_seen = async (conversation_ID) => {
    try {
        const response = await http_context(`${API_URL}/Message/Group/${conversation_ID}/mark-as-seen?conversationID=${conversation_ID}`, {
            method: 'PUT',
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
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}


