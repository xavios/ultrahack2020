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
        return responseJson.event;
    }
}
