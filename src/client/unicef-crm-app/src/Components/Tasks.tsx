import React from "react";
import configuration from "./../Api/Configuration";
import { TaskViewModel } from "../Models/TaskViewModel";
import TaskApiClient from "../Api/TaskApiClient";
import { Status } from "../Models/Status";
import { EventClickArg } from "@fullcalendar/core";
import { ITask } from "../Models/ITask";

class Volunteer {
  FirstName: any;
  LastName: any;
  Email: any;
  MobilePhone: any;
  PrimaryMethodOfContact: any;
  Password: any;
}

interface ITasksProps {
}

interface ITaskViewState {
    selectedTask?: ITask;
    tasks: TaskViewModel[];
}

export default class Tasks extends React.Component<any, ITaskViewState> {
  private taskApiClient : TaskApiClient;
        
  constructor(props: ITasksProps) {
      super(props);
      this.taskApiClient = new TaskApiClient();
      this.state = {
        selectedTask: undefined,
          tasks: []
      };

  }

  componentDidMount(){
      fetch(`${configuration.serviceBaseUrl}/tasks/gettasks`, {
          method: 'GET'
      })
      .then((resp) => resp.json())
      .then((response) => {
          const tasks = response.tasks.map((e: any) => {
              let vm : TaskViewModel = {
                  id: e._id,
                  title: e.name,
                  deadLine: e.deadLine
              };
              return vm;

          });
         this.setState({ selectedTask: undefined, tasks: tasks });
      });
  }

  render() {     
      if (this.state.selectedTask) {
          return <div></div>; //(<TaskDetails event={this.state.selectedTask} onBackClick={this.onBackClick} />);
      } 

      return (<div></div>);    
  }

  onAddTaskClick = () => {
      this.setState({ selectedTask: {
          _id: undefined,
          name: "New Task",
          deadLine: new Date("2020.12.06."),
          status: Status.openForRegistration,
          location: "Budapest",
          capacity: 3,
          description: "This is the latest unicef event",
          requiredSkills: "speech",
          recommendedSkills: "luck"
      }})
  }

  onBackClick = () => {
      this.componentDidMount();
  }

  onTaskClick = async (arg: EventClickArg) => {
      const taskId = arg.event.id;
      const task : ITask = await this.taskApiClient.get(taskId);
      this.setState({ selectedTask: task });
  }
}
