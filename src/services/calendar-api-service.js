const API_URL = import.meta.env.VITE_ClubCore_Server_API;
import { http_context } from './http-context.js';

export const get_my_events = async (date, dateOption) => {
    try{
        //format date to yyyy-mm-dd
        date = date.toISOString().split('T')[0];

        const response = await http_context(`${API_URL}/events/get-my-events?date=${date}&dateOption=${dateOption}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const events = await response.json();
        return events;

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

        return response;


    }catch(error){
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const update_calendar_event = async (calendarEvent) => {
    try{    
        const response = await http_context(`${API_URL}/events/sa-update-event`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },  
            credentials: 'include',
            body: JSON.stringify(calendarEvent)

        });

        if (!response.ok) {
            return false;
        }

        return response;
    }catch(error){
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const delete_calendar_event = async (eventID) => {
    try{    
        const response = await http_context(`${API_URL}/events/sa-delete-event?eventID=${eventID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },  
            credentials: 'include'

        });

        if (!response.ok) {
            return false;
        }

        return true;
    }catch(error){
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
