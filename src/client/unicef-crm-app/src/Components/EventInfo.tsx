import React, { FC, ReactElement } from "react";
import { CalendarEvent } from "../Models/CalendarEvent";

type EventInfoProps = {
    event: CalendarEvent;
    onBackClick: () => void;
}

const EventInfo : FC<EventInfoProps> = (props): ReactElement => {  
    return (
        <div>
            <div>{ props.event.id }</div>
            <h3>{ props.event.title }</h3>
            <div>{ props.event.start }</div>

            <button 
                onClick={props.onBackClick}
                type="button" 
                className="btn btn-primary">Back</button>
        </div>
    );
};

export default EventInfo;