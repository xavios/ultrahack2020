import { IEvent } from "../Models/IEvent";
import Configuration from "./Configuration";
import { Cookies } from "react-cookie";

export default class EventApiClient {
  cookies = new Cookies();
  public async addEvent(event: IEvent): Promise<void> {
    await fetch(`${Configuration.serviceBaseUrl}/events/createevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.cookies.get("x-access-token") as string,
      },
      body: JSON.stringify(event),
    });
  }

  public async get(id: string): Promise<IEvent> {
    const response = await fetch(
      `${Configuration.serviceBaseUrl}/events/getevent/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
      }
    );

    const responseJson = await response.json();
    let event = responseJson.event;
    event.startDate = new Date(event.startDate);
    event.endDate = new Date(event.endDate);

    return event;
  }

  public async delete(id?: string): Promise<void> {
    await fetch(`${Configuration.serviceBaseUrl}/events/deleteevent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.cookies.get("x-access-token") as string,
      },
    });
  }

  public async update(event: IEvent): Promise<void> {
    const body = JSON.stringify(event);
    console.log(body);

    const response = await fetch(
      `${Configuration.serviceBaseUrl}/events/updateevent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
        body: JSON.stringify(event),
      }
    );

    const responseJson = await response.json();
    console.log(responseJson);
  }

  public async getEvents(): Promise<IEvent[]> {
    const response = await fetch(
      `${Configuration.serviceBaseUrl}/events/getevents`,
      {
        method: "GET",
        headers: {
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
      }
    );

    const responseJson = await response.json();
    return responseJson.events;
  }
}
