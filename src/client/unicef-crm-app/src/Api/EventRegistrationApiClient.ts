import { IUser } from "../Models/IUser";
import Configuration from "./Configuration";

export default class EventRegistrationApiClient {
    public async getRegisteredUsers(eventId?: string): Promise<IUser[]> {
        const response = await fetch(
            `${Configuration.serviceBaseUrl}/eventregistrations/geteventregistrations/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        const responseJson = await response.json();
        return responseJson.users;
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