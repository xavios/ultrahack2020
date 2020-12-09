import { IEvent } from "../Models/IEvent";
import Configuration from "./Configuration";

export default class EventApiClient {
    public async addEvent(event: IEvent): Promise<void> {
        const response = await fetch(
            `${Configuration.serviceBaseUrl}/events/createevent`, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            }
        );
    }

    public async get(id: string) : Promise<IEvent> {
        const response = await fetch(
            `${Configuration.serviceBaseUrl}/events/getevent/${id}`, {
                method: 'GET',
                headers:  {
                    'Content-Type': 'application/json'
                }
            }
        );

        const responseJson =  await response.json();
        let event = responseJson.event;
        debugger;
        event.startDate = new Date(event.startDate);
        event.endDate = new Date(event.endDate);
        
        return event;
    }

    public async delete(id?: string): Promise<void> {
        await fetch(
            `${Configuration.serviceBaseUrl}/events/deleteevent/${id}`, {
                method: 'DELETE',
                headers:  {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    public async update(event: IEvent): Promise<void> {
        const body = JSON.stringify(event);
        console.log(body);

        const response = await fetch(
            `${Configuration.serviceBaseUrl}/events/updateevent`, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            }
        );
            
        
        const responseJson = await response.json();
        console.log(responseJson)
    }
}
