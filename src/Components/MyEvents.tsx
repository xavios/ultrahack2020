import React, { FC, ReactElement, useEffect, useState } from "react";
import EventApiClient from "src/Api/EventApiClient";
import EventRegistrationApiClient from "src/Api/EventRegistrationApiClient";
import { IEventRegistration } from "src/Models/IEventRegistration";
import { Status } from "src/Models/Status";
import { IEvent } from "../Models/IEvent"
import { IUser } from "../Models/IUser";

type MyEventsProps = {
    userId: string;

}

type EventViewModel = {
    name?: string;
    startDate?: Date;
    endDate?: Date;
    location?: string;
    status?: Status;
    confirmed?: boolean;
    registrationId?: string;
}

const MyEvents : FC<MyEventsProps> = (props): ReactElement => { 
    const eventRegistrationApiClient = new EventRegistrationApiClient();
    const eventApiClient = new EventApiClient();

    const [state, setState] = useState({
        user: {} as IUser,
        events: Array<IEvent>(),
        registrations: Array<IEventRegistration>(),
        userEvents: Array<EventViewModel>()
    });

    useEffect(() => {
        async function loadDataWrapper() {
          await loadData();
        }
        loadDataWrapper();
    }, []);

    const loadData = async () => {
        const registrations = await eventRegistrationApiClient.getbyUserId(props.userId);
        const events = await eventApiClient.getEvents();

        const userEvents = registrations.map(reg => {
            const event = events.find(event => event._id === reg.eventId);
            return {
                name: event?.name,
                startDate: event?.startDate,
                endDate: event?.endDate,
                location: event?.location,
                status: event?.status,
                confirmed: reg.confirmed,
                registrationId: reg._id
            }
        });

        setState({
            ...state, 
            userEvents: userEvents
        })
    }

    const onRemoveRegistrationClick = async (eventId?: string) => {
        if (eventId) {
            await eventRegistrationApiClient.delete(eventId);
            await loadData();
        }
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Start date</th>
                    <th scope="col">End date</th>
                    <th scope="col">Event name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {state.userEvents.map((e) => {
                    return <tr>
                        <td className="align-middle">{e.startDate?.toString().split("T")[0]}</td>
                        <td className="align-middle">{e.endDate?.toString().split("T")[0]}</td>
                        <td className="align-middle">{e.name}</td>
                        <td className="align-middle">{e.location}</td>
                        <td className="align-middle">{e.confirmed ?
                            <span className="badge badge-success align-middle">Confirmed</span>                            
                            :
                            <span className="badge badge-warning">Pending</span>                            

                         }
                        </td>
                        <td className="align-middle">
                            <button type="button" className="btn btn-outline-danger"
                                onClick={() => onRemoveRegistrationClick(e.registrationId)}>Delete registration</button>
                        </td>
                    </tr>
                })}         
            </tbody>
        </table>
    );
}

export default MyEvents;