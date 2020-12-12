import React, { FC, ReactElement, useEffect, useState } from "react";
import configuration from "./../Api/Configuration";
import { TaskViewModel } from "../Models/TaskViewModel";
import TaskApiClient from "../Api/TaskApiClient";
import { Status } from "../Models/Status";
import { ITask } from "../Models/ITask";
import DatePicker from "react-datepicker";
import { EventStatus } from "src/Models/EventStatus";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";


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
  task: ITask,
  onBackClick: () => void;

};


const TaskDetails: FC<ITasksProps> = (props): ReactElement => {   
  const [state, setState] = useState(props.task);
  const taskApiClient : TaskApiClient = new TaskApiClient();

  const options = [
    EventStatus[EventStatus.openForRegistration],
    EventStatus[EventStatus.closed],
  ];
  
  async function onSaveClick() {
    debugger;
    if (state._id) {
      await taskApiClient.update(state);
    } else {
      await taskApiClient.addTask(state);
    }
    props.onBackClick();
  }

  async function onDeleteClick() {
    await taskApiClient.delete(state._id);
    props.onBackClick();
  }

  return(
    <div className="text-left">
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Task Name</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="name"
            value={state.name}
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Deadline</label>
        <div className="col-sm-10">
          <DatePicker
            selected={state.deadLine}
            onChange={(date: any) => {
              setState({ ...state, deadLine: date });
            }}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Status</label>
        <div className="col-sm-10">
          <Dropdown
            options={options}
            onChange={(arg) => {
              setState({ ...state, status: arg.value as Status });
            }}
            value={EventStatus[state.status]}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Location</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="name"
            value={state.location}
            onChange={(e) => {
              setState({ ...state, location: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Required skills</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="requiredSkills"
            value={state.requiredSkills}
            onChange={(e) => {
              setState({ ...state, requiredSkills: e.target.value });
            }}
          />
        </div>
      </div>    

       <div className="btn-toolbar justify-content-between">
        <button
          onClick={props.onBackClick}
          type="button"
          className="btn btn-primary"
        >
          Back
        </button>

        <div className="btn-toolbar">         
          <button
            onClick={onSaveClick}
            type="button"
            className="btn btn-success"
          >
            Save changes
          </button>
        </div>
      </div>

    </div>); 
}

export default TaskDetails;