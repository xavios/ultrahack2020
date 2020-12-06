import { CalendarEvent } from "../Models/CalendarEvent";

export default interface IEventApiClient {
    addEvent(title: string, start: Date, end: Date): void;
    getEvents() : CalendarEvent[]; 
}