import { EventStatus } from "../Models/EventStatus";
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

        console.log(response);
    }

    public get(id: string) : IEvent {
        return {
            id: id,
            name: "event from db",
            status: EventStatus.openForRegistration     
        }
    }
}
