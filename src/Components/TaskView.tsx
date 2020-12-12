import { load } from "dotenv/types";
import React, { FC, ReactElement, useEffect, useState } from "react";
import TaskApiClient from "src/Api/TaskApiClient";
import { EventStatus } from "src/Models/EventStatus";
import { ITask } from "src/Models/ITask";
import { Status } from "src/Models/Status";
import { IEvent } from "../Models/IEvent"
import Tasks from "./Tasks";

type TaskViewProps = {
}

type TaskViewState = {
    tasks: Array<ITask>,
    selectedTask?: ITask
}

const TaskView : FC<TaskViewProps> = (props): ReactElement => { 
    const [state, setState] = useState<TaskViewState>({
        tasks: Array<ITask>(),
        selectedTask: undefined
    });
    const taskApiClient = new TaskApiClient(); 

    useEffect(() => {
        async function loadDataWrapper() {
          await loadData();
        }
        loadDataWrapper();
    }, []);

    const loadData = async () => {
        const tasks = await taskApiClient.getAllTasks();   
        setState({ tasks: tasks, selectedTask: undefined});
    }

    const onDeleteClick = async(id?: string) => {
        if (id !== undefined) {
            await taskApiClient.delete(id);
            await loadData();
        }
    }

    const onNewClick = () => {
        setState({ ...state, selectedTask:  {
            name: "New Task",
            status: Status.openForRegistration,
            deadLine: new Date()
        }})
    }
      
    return (
        state.selectedTask ? <Tasks task={state.selectedTask} />       
             : 
             <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Deadline</th>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Status</th>
                        <th scope="col">Capacity</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {state.tasks.map((e) => {
                        return <tr>
                            <td className="align-middle">{e.deadLine?.toString().split("T")[0]}</td>
                            <td className="align-middle">{e.name}</td>
                            <td className="align-middle">{e.location}</td>
                            <td className="align-middle">{e.status.toString()}</td>
                            <td className="align-middle">{e.capacity}</td>
                    
                            <td className="align-middle">
                                <button type="button" className="btn btn-outline-danger"
                                    onClick={() => onDeleteClick(e._id)}>Delete task</button>
                            </td>
                        </tr>
                    })}         
                </tbody>
            </table>
            <button
            onClick={onNewClick}
            type="button"
            className="btn btn-primary">
            Add new Task
        </button>
        </div>
    );
}

export default TaskView;