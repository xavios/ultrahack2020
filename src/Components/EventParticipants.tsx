import React, { FC, ReactElement, useEffect, useState } from "react";
import EventRegistrationApiClient from "../Api/EventRegistrationApiClient";
import UserApiClient from "../Api/UserApiClient";
import { IEvent } from "./../Models/IEvent";
import { IEventRegistration } from "./../Models/IEventRegistration";
import { IUser } from "./../Models/IUser";

type EventParticipantsProps = {
  event: IEvent;
  onBackClick: () => void;
};

const EventParticipants: FC<EventParticipantsProps> = (props): ReactElement => {
  const userApiClient = new UserApiClient();
  const eventRegistrationApiClient = new EventRegistrationApiClient();

  const [state, setState] = useState({
    registrations: Array<IEventRegistration>(),
    users: Array<IUser>(),
    availableUsers: Array<IUser>(),
    registeredUsers: Array<IUser>(),
    confirmedUsers: Array<IUser>(),
  });

  useEffect(() => {
    async function loadDataWrapper() {
      await loadData();
    }
    loadDataWrapper();
  }, []);

  const loadData = async () => {
    const users = await userApiClient.getUsers();
    const registrations = await eventRegistrationApiClient.getRegisteredUsers(
      props.event._id
    );
    const registeredUsers = users.filter((u) =>
      registrations
        .filter((r) => r.userId === u._id && !r.confirmed)
        .map((m) => m.userId)
        .includes(u._id)
    );

    const confirmedUsers = users.filter((u) =>
      registrations
        .filter((r) => r.userId === u._id && r.confirmed)
        .map((m) => m.userId)
        .includes(u._id)
    );

    const availableUsers = users.filter(
      (user) => !registrations.map((r) => r.userId).includes(user._id)
    );

    setState({
      ...state,
      registrations: registrations,
      users: users,
      availableUsers: availableUsers,
      registeredUsers: registeredUsers,
      confirmedUsers: confirmedUsers,
    });
  };

  const onAddClick = async (userId: string) => {
    if (props.event._id) {
      await eventRegistrationApiClient.create(userId, props.event._id, false);
      await loadData();
    }
  };

  const onConfirmClick = async (userId: string) => {
    if (props.event._id) {
      await eventRegistrationApiClient.update(userId, props.event._id, true);
      await loadData();
    }
  };

  const onRemoveClick = async (userId: string) => {
    if (props.event._id) {
      const registration = state.registrations.find((r) => r.userId === userId);
      if (registration) {
        await eventRegistrationApiClient.delete(registration._id);
        await loadData();
      }
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-4">
          <h3>Available users</h3>
          <ul className="list-group">
            {state.availableUsers.map((user) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={user._id}
                >
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => onAddClick(user._id)}
                  >
                    Register
                  </button>
                  {user.firstName} {user.lastName}
                  <span className="badge badge-primary badge-pill">
                    {user.userType}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="col-sm-4">
          <h3>Registered users</h3>
          <ul className="list-group">
            {state.registeredUsers.map((user) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={user._id}
                >
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => onConfirmClick(user._id)}
                  >
                    Confirm
                  </button>
                  {user.firstName} {user.lastName}
                  <span className="badge badge-primary badge-pill">
                    {user.userType}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="col-sm-4">
          <h3>Confirmed users</h3>
          <ul className="list-group">
            {state.confirmedUsers.map((user) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={user._id}
                >
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onRemoveClick(user._id)}
                  >
                    Remove
                  </button>
                  {user.firstName} {user.lastName}
                  <span className="badge badge-primary badge-pill">
                    {user.userType}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="btn-toolbar justify-content-between mt-5">
        <button
          onClick={props.onBackClick}
          type="button"
          className="btn btn-primary"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default EventParticipants;
