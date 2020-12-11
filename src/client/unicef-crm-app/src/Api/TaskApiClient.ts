import { ITask } from "../Models/ITask";
import Configuration from "./Configuration";

export default class TaskApiClient {
    public async addTask(task: ITask): Promise<void> {
        const response = await fetch(
            `${Configuration.serviceBaseUrl}/tasks/createtask`, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            }
        );
    }

    public async get(id: string) : Promise<ITask> {
        const response = await fetch(
            `${Configuration.serviceBaseUrl}/tasks/gettask/${id}`, {
                method: 'GET',
                headers:  {
                    'Content-Type': 'application/json'
                }
            }
        );

        const responseJson =  await response.json();
        let task = responseJson.event;
        task.startDate = new Date(task.startDate);
        
        return task;
    }

    public async getAllTasks() : Promise<Array<ITask>> {
        const response = await fetch(
            `${Configuration.serviceBaseUrl}/tasks/gettask`, {
                method: 'GET',
                headers:  {
                    'Content-Type': 'application/json'
                }
            }
        );

        const responseJson =  await response.json();        
        return responseJson.tasks;
    }

    public async delete(id?: string): Promise<void> {
        await fetch(
            `${Configuration.serviceBaseUrl}/tasks/deletetask/${id}`, {
                method: 'DELETE',
                headers:  {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    public async update(task: ITask): Promise<void> {
        const body = JSON.stringify(task);
        console.log(body);

        const response = await fetch(
            `${Configuration.serviceBaseUrl}/tasks/updatetask`, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            }
        );
            
        
        const responseJson = await response.json();
        console.log(responseJson)
    }
}
