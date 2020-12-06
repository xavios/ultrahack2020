import React, { FC, ReactElement, useState } from "react";
import EventApiClient from "../Api/EventApiClient";
import IEventApiClient from "../Api/IEventApiClient";
import { CalendarEvent } from "../Models/CalendarEvent";

type EventInfoProps = {
    event: CalendarEvent;
    onBackClick: () => void;
}

type EventInfoState = {
    event: CalendarEvent;
}

const EventInfo : FC<EventInfoProps> = (props): ReactElement => {  
    const [state, setState] = useState(props.event);
    const eventApiClient : IEventApiClient = new EventApiClient();

    function onSaveClick() {
        console.log(state);
        eventApiClient.addEvent(state);
    }

    return (
        <div>
            <h3 className="mb-5">Event information</h3>

            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Event Title</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="title" value={ state.title } 
                            onChange={(e) => { setState( 
                                {...state, title: e.target.value}
                            )}} />
                </div>
            </div>

            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Start date</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="start" value={ state.start } 
                            onChange={(e) => { setState( 
                                {...state, start: e.target.value}
                            )}} />
                </div>
            </div> 

            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">End date</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="end" value={ state.end } 
                            onChange={(e) => { setState( 
                                {...state, end: e.target.value}
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