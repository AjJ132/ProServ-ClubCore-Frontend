const API_URL = import.meta.env.VITE_ClubCore_Server_API;
import { http_context } from './http-context.js';

export const create_direct_message_thread = async (User2_ID) => {  
    try {
        const response = await http_context(`${API_URL}/message/create-direct-message-thread`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },  
            credentials: 'include',
            body: JSON.stringify({User2_ID}),
        });
        if (!response.ok) {
            return;
        }

        const data = await response.json();
        const thread = data.thread;
        
        return thread;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}


// export const get_team_location = async () => {
//     try {
//         const response = await http_context(`${API_URL}/Team/get-team-location`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },  
//             credentials: 'include',
//         });
//         if (!response.ok) {
//             return;
//         }

//         const data = await response.json();
//         const team_location = data.team_Location;
        
//         return team_location;
//     } catch (error) {
//         console.error('There was a problem with the fetch operation:', error);
//         throw error;
//     }
// }