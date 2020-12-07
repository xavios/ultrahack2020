import React, { FC, ReactElement, useState } from "react";
import EventApiClient from "../Api/EventApiClient";
import { EventStatus } from "../Models/EventStatus";
import { IEvent } from "../Models/IEvent";

type EventInfoProps = {
    event: IEvent;
    onBackClick: () => void;
}

type EventInfoState = {
    event: IEvent;
}

const EventInfo : FC<EventInfoProps> = (props): ReactElement => {  
    const [state, setState] = useState(props.event);
    const eventApiClient : EventApiClient = new EventApiClient();

    async function onSaveClick() {
        console.log(state);
        await eventApiClient.addEvent(state);
    }

    return (
        <div>
            <h3 className="mb-5">Event information</h3>

            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Event Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="name" value={ state.name } 
                            onChange={(e) => { setState( 
                                {...state, name: e.target.value}
                            )}} />
                </div>
            </div>

            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">End date</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="date" value={ state.date?.toString() } 
                            onChange={(e) => { setState( 
                                {...state, date: new Date(e.target.value)}
                            )}} />
                </div>
            </div> 

            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Status</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="status" value={ state.status?.toString() } 
                            onChange={(e) => { 
                                // TODO
                                //let statusString : string = e.target.value as keyof EventStatus;
                                //let newStatus : EventStatus = EventStatus[statusString];
                                let newStatus = EventStatus.openForRegistration;
                                setState({...state, status: newStatus })}
                            } />
                </div>
            </div> 

            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Location</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="location" value={ state.location } 
                            onChange={(e) => { setState( 
                                {...state, location: e.target.value}
                            )}} />
                </div>
            </div> 

            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="description" value={ state.description } 
                            onChange={(e) => { setState( 
                                {...state, description: e.target.value}
                            )}} />
                </div>
            </div> 

            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Capacity</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" id="capacity" value={ state.capacity } 
                            onChange={(e) => { setState( 
                                {...state, capacity: parseInt(e.target.value)}
                            )}} />
                </div>
            </div> 

            <div className="btn-toolbar justify-content-between">
                <button 
                    onClick={props.onBackClick}
                    type="button" 
                    className="btn btn-primary">Back</button>
                <button 
                    onClick={onSaveClick}
                    type="button" 
                    className="btn btn-success pull-right">Save changes</button>
            </div>
        </div>
    );
};

export default EventInfo;