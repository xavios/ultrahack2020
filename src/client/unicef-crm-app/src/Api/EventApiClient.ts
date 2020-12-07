import { EventViewModel }  from "../Models/EventViewModel";
import { IEvent } from "../Models/IEvent";

export default class EventApiClient {
    private baseUrl = "http://localhost:4000";

    public async addEvent(event: IEvent): Promise<void> {
        const response = await fetch(
            `${this.baseUrl}/createevent`, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            }
        );

        console.log(response);
        if (response.status !== 201) {
            
        }
    }

    public get(id: number) : IEvent {
        return {
            id: id,
            name: "event from db"        
        }
    }

    public getEvents() : EventViewModel[] {
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