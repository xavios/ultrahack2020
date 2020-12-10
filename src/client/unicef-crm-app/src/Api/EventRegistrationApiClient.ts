import { IEventRegistration } from "../Models/IEventRegistration";
import Configuration from "./Configuration";

export default class EventRegistrationApiClient {
    public async getRegisteredUsers(eventId?: string): Promise<IEventRegistration[]> {
        const response = await fetch(
            `${Configuration.serviceBaseUrl}/eventregistrations/geteventregistrations/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        const responseJson = await response.json();
        return responseJson.registrations;
    }

    public async create(userId: string, eventId: string, confirmed: boolean) : Promise<void> {
        await fetch(
            `${Configuration.serviceBaseUrl}/eventregistrations/createeventregistration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    eventId: eventId,
                    confirmed: confirmed
                })
            }
        )
    }
}