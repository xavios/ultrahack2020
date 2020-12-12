import { IEventRegistration } from "../Models/IEventRegistration";
import Configuration from "./Configuration";
import { Cookies } from "react-cookie";

export default class EventRegistrationApiClient {
  cookies = new Cookies();
  public async getRegisteredUsers(
    eventId?: string
  ): Promise<IEventRegistration[]> {
    const response = await fetch(
      `${Configuration.serviceBaseUrl}/eventregistrations/geteventregistrations/${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
      }
    );

    const responseJson = await response.json();
    return responseJson.registrations;
  }

  public async create(
    userId: string,
    eventId: string,
    confirmed: boolean
  ): Promise<void> {
    await fetch(
      `${Configuration.serviceBaseUrl}/eventregistrations/createeventregistration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
        body: JSON.stringify({
          userId: userId,
          eventId: eventId,
          confirmed: confirmed,
        }),
      }
    );
  }

  public async update(
    userId: string,
    eventId: string,
    confirmed: boolean
  ): Promise<IEventRegistration> {
    const response = await fetch(
      `${Configuration.serviceBaseUrl}/eventregistrations/setuserconfirmation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
        body: JSON.stringify({
          userId: userId,
          eventId: eventId,
          confirmed: confirmed,
        }),
      }
    );

    const responseJson = await response.json();
    return responseJson.updatedRegistration;
  }

  public async delete(registrationId: string): Promise<void> {
    await fetch(
      `${Configuration.serviceBaseUrl}/eventregistrations/deleteeventregistration/${registrationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
      }
    );
  }

  public async getbyUserId(userId: string): Promise<IEventRegistration[]> {
    const response = await fetch(
      `${Configuration.serviceBaseUrl}/eventregistrations/getuserregistrations/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
      }
    );

    const responseJson = await response.json();
    return responseJson.registrations;
  }
}
