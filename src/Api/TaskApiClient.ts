import { ITask } from "../Models/ITask";
import Configuration from "./Configuration";
import { Cookies } from "react-cookie";

export default class TaskApiClient {
  cookies = new Cookies();
  public async addTask(task: ITask): Promise<void> {
    const response = await fetch(
      `${Configuration.serviceBaseUrl}/tasks/createtask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
        body: JSON.stringify(task),
      }
    );
  }

  public async get(id: string): Promise<ITask> {
    const response = await fetch(
      `${Configuration.serviceBaseUrl}/tasks/gettask/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
      }
    );

    const responseJson = await response.json();
    let task = responseJson.event;
    task.startDate = new Date(task.startDate);

    return task;
  }

  public async getAllTasks(): Promise<Array<ITask>> {
    const response = await fetch(
      `${Configuration.serviceBaseUrl}/tasks/gettask`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
      }
    );

    const responseJson = await response.json();
    return responseJson.tasks;
  }

  public async delete(id?: string): Promise<void> {
    await fetch(`${Configuration.serviceBaseUrl}/tasks/deletetask/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.cookies.get("x-access-token") as string,
      },
    });
  }

  public async update(task: ITask): Promise<void> {
    const body = JSON.stringify(task);
    console.log(body);

    const response = await fetch(
      `${Configuration.serviceBaseUrl}/tasks/updatetask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
        body: JSON.stringify(task),
      }
    );

    const responseJson = await response.json();
    console.log(responseJson);
  }
}
