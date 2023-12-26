const API_URL = import.meta.env.VITE_ClubCore_Server_API;
import { http_context } from './http-context.js';

export const get_calendar_events_by_date_range = async (start_date, end_date) => {
    try{

    }catch(error){

    }
};

export const add_calendar_event = async (calendarEvent) => {
    try{    
        const response = await http_context(`${API_URL}/events/sa-add-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },  
            credentials: 'include',
            body: JSON.stringify(calendarEvent)

        });

        if (!response.ok) {
            return false;
        }

        return response.json();


    }catch(error){
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};
