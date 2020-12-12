import React, { FC, ReactElement, useEffect, useState } from "react";
import configuration from "./../Api/Configuration";
import { TaskViewModel } from "../Models/TaskViewModel";
import TaskApiClient from "../Api/TaskApiClient";
import { Status } from "../Models/Status";
import { ITask } from "../Models/ITask";

class Volunteer {
  FirstName: any;
  LastName: any;
  Email: any;
  MobilePhone: any;
  PrimaryMethodOfContact: any;
  Password: any;
}

type ITaskViewState = {
  selectedTask: TaskViewModel;
  tasks: TaskViewModel[];
};

type ITasksProps = {
};


const TaskDetails: FC = (): ReactElement => {   
    const [state, setState] = useState({
        selectedTask: undefined,
        tasks: Array<TaskViewModel>()});

    const taskApiClient : TaskApiClient = new TaskApiClient();

  useEffect(() => {
    async function loadDataWrapper() {
        const tasks = await taskApiClient.getAllTasks();
        //setState({ tasks: tasks });
    }
    loadDataWrapper();
  }, []);

  // const onAddTaskClick = () => {
  //   setState({ selectedTask: {
  //       _id: undefined,
  //       name: "New Task",
  //       deadLine: new Date("2020.12.06."),
  //       status: Status.openForRegistration,
  //       location: "Budapest",
  //       capacity: 3,
  //       description: "This is the latest unicef event",
  //       requiredSkills: "speech",
  //       recommendedSkills: "luck"
  //   }})

const onBackClick = () => {
    //this.componentDidMount();
}

const onTaskClick = async (arg: any) => {
    const taskId = arg.event.id;
    //const task : ITask = await taskApiClient.get(taskId);
    //setState({ selectedTask: task });
}

return( <div></div>); 
//(<TaskDetails event={this.state.selectedTask} onBackClick={this.onBackClick} />); 
}

export default TaskDetails;