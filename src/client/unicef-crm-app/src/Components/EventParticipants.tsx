import React, { FC, ReactElement, useEffect, useState } from "react";
import EventRegistrationApiClient from "../Api/EventRegistrationApiClient";
import UserApiClient from "../Api/UserApiClient";
import { IEvent } from "../Models/IEvent"
import { IUser } from "../Models/IUser";

type EventParticipantsProps = {
    event: IEvent;
    onBackClick: () => void
}

const EventParticipants : FC<EventParticipantsProps> = (props): ReactElement => { 
    const userApiClient = new UserApiClient();
    const eventRegistrationApiClient = new EventRegistrationApiClient();

    const [state, setState] = useState({
        users: Array<IUser>(),
        registeredUsers: Array<IUser>(),
        availableUsers: Array<IUser>()
    });
    
    useEffect(() => {
        async function loadDataWrapper() {
            await loadData();
        }
        loadDataWrapper();
      }, []);
    
    const loadData = async () => {
        const users = await userApiClient.getUsers();            
        const eventRegistrations = await eventRegistrationApiClient.getRegisteredUsers(props.event._id);

        const registeredUsers = users.filter(user => eventRegistrations.map(r => { return r.userId }).includes(user._id));
        const availableUsers = users.filter(user => !registeredUsers.includes(user));

        setState({ ...state, users: users, registeredUsers: registeredUsers, availableUsers: availableUsers});
    }

    const onAddClick = async (userId: string) => {
        if (props.event._id) {
            await eventRegistrationApiClient.create(userId, props.event._id, false);
            await loadData();
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-sm-6">
                    <h3>Registered users</h3>
                    <ul className="list-group">
                        {state.registeredUsers.map(user => {
                            return(<li className="list-group-item d-flex justify-content-between align-items-center" key={user._id}>
                                {user.firstName} {user.lastName}
                            <span className="badge badge-primary badge-pill">{user.userType}</span></li>)
                        })}              
                    </ul>
                </div>

                <div className="col-sm-6">
                    <h3>Available users</h3>
                    <ul className="list-group">
                        {state.availableUsers.map(user => {
                            return(<li className="list-group-item d-flex justify-content-between align-items-center" key={user._id}>
                                <button type="button" 
                                className="btn btn-outline-primary"
                                onClick={() => onAddClick(user._id)}
                                >Add</button>

                                {user.firstName} {user.lastName}
                            <span className="badge badge-primary badge-pill">{user.userType}</span></li>)
                        })}              
                    </ul>
                </div>
            </div>

            <div className="btn-toolbar justify-content-between mt-5">
                <button 
                    onClick={props.onBackClick}
                    type="button" 
                    className="btn btn-primary">Back</button>                                 
            </div>
        </div>
    );
}

export default EventParticipants;