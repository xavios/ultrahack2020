import { CalendarEvent }  from "../Models/CalendarEvent";
import IEventApiClient from "./IEventApiClient";


export default class EventApiClient implements IEventApiClient {
    public addEvent(event: CalendarEvent): void {
        console.log("TODO add event via API");
    }

    public getEvents() : CalendarEvent[] {
        return [
            {
                id: '999',
                title  : 'event3',
                start  : '2020-12-06T12:30:00',
                end: '2020-12-06T14:30:00',
                allDay : false // will make the time show
            },
            {
                id: '1001',
                title  : 'event2',
                start  : '2020-12-05',
                end    : '2020-12-07',
                allDay: true
            }
        ]
    }
}