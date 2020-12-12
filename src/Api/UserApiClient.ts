import { IUser } from "../Models/IUser";
import Configuration from "./Configuration";

export default class UserApiClient {
    public async getUsers() : Promise<IUser[]> {
        const response = await fetch(
            `${Configuration.serviceBaseUrl}/users/getusers`, {
                method: 'GET',
                headers:  {
                    'Content-Type': 'application/json'
                },
            }
        )

        const responseJson =  await response.json();

        return responseJson.users;
    }

    public async get(userId: string) : Promise<IUser> {
        const response = await fetch(
            `${Configuration.serviceBaseUrl}/users/getuser/${userId}`, {
                method: 'GET',
                headers:  {
                    'Content-Type': 'application/json'
                },
            }
        )

        const responseJson =  await response.json();

        return responseJson.user;
    }
}