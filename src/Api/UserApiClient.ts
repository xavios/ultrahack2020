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
        const user : IUser = responseJson.user;
        user.availability = user.availability.map(a => {
            return {
                _id: a._id,
                from: new Date(a.from),
                to: new Date(a.to)
            }
        })
        return user;
    }

    public async update(user: IUser) : Promise<IUser> {
        const response = await fetch(
            `${Configuration.serviceBaseUrl}/users/updateuser`, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
        )

        const responseJson =  await response.json();

        return responseJson.user;
    }
}