import React, { FC, ReactElement, useState } from "react";
import EventApiClient from "../Api/EventApiClient";
import { EventStatus } from "./../Models/EventStatus";
import { IEvent } from "./../Models/IEvent";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Status } from "src/Models/Status";

type BasicEventDataProps = {
  event: IEvent;
  onBackClick: () => void;
};

const BasicEventData: FC<BasicEventDataProps> = (props): ReactElement => {
  const [state, setState] = useState(props.event);
  const eventApiClient: EventApiClient = new EventApiClient();

  const options = [
    EventStatus[EventStatus.openForRegistration],
    EventStatus[EventStatus.closed],
  ];

  async function onSaveClick() {
    if (state._id) {
      await eventApiClient.update(state);
    } else {
      await eventApiClient.addEvent(state);
    }
    props.onBackClick();
  }

  async function onDeleteClick() {
    await eventApiClient.delete(state._id);
    props.onBackClick();
  }

  return (
    <div className="text-left">
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Event Name</label>
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
        <label className="col-sm-2 col-form-label">Start Date</label>
        <div className="col-sm-10">
          <DatePicker
            selected={state.startDate}
            onChange={(date: any) => {
              setState({ ...state, startDate: date });
            }}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-2 col-form-label">End Date</label>
        <div className="col-sm-10">
          <DatePicker
            selected={state.endDate}
            onChange={(date: any) => {
              setState({ ...state, endDate: date });
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
            id="location"
            value={state.location}
            onChange={(e) => {
              setState({ ...state, location: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Description</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="description"
            value={state.description}
            onChange={(e) => {
              setState({ ...state, description: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Capacity</label>
        <div className="col-sm-10">
          <input
            type="number"
            className="form-control"
            id="capacity"
            value={state.capacity}
            onChange={(e) => {
              setState({ ...state, capacity: parseInt(e.target.value) });
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
            onClick={onDeleteClick}
            type="button"
            className="btn btn-danger mr-5"
          >
            Delete
          </button>
          <button
            onClick={onSaveClick}
            type="button"
            className="btn btn-success"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicEventData;
