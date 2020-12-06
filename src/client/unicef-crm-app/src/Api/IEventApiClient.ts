import { CalendarEvent } from "../Models/CalendarEvent";

export default interface IEventApiClient {
    addEvent(event: CalendarEvent): void;
    getEvents() : CalendarEvent[]; 
}