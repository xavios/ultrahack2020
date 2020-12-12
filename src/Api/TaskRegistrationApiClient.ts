import { ITaskRegistration } from "../Models/ITaskRegistration";
import Configuration from "./Configuration";

export default class TaskRegistrationApiClient {
    public async getRegisteredUsers(taskId?: string): Promise<ITaskRegistration[]> {
        const response = await fetch(
            `${Configuration.serviceBaseUrl}/taskregistrations/gettasktregistrations/${taskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        const responseJson = await response.json();
        return responseJson.registrations;
    }

    public async create(userId: string, taskId: string, confirmed: boolean) : Promise<void> {
        await fetch(
            `${Configuration.serviceBaseUrl}/taskregistrations/createtaskregistration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    taskId: taskId,
                    confirmed: confirmed
                })
            }
        )
    }

    public async update(userId: string, taskId: string, confirmed: boolean): Promise<ITaskRegistration> {
        const response = await fetch(
            `${Configuration.serviceBaseUrl}/taskregistrations/setuserconfirmation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    taskId: taskId,
                    confirmed: confirmed
                })
            }
        )

        const responseJson = await response.json();
        return responseJson.updatedRegistration;
    }

    public async delete(registrationId: string): Promise<void> {
        await fetch(
            `${Configuration.serviceBaseUrl}/taskregistrations/deletetaskregistration/${registrationId}`, {
                method: 'DELETE',
                headers:  {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    public async getbyUserId(userId: string) : Promise<ITaskRegistration[]> {
        const response = await fetch(
            `${Configuration.serviceBaseUrl}/taskregistrations/getuserregistrations/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        const responseJson = await response.json();
        return responseJson.registrations;
    }
}