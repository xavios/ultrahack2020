import React, { FC, ReactElement, useState } from "react";
import { IEvent } from "../Models/IEvent"

type EventParticipantsProps = {
    event: IEvent;
    onBackClick: () => void
}

const EventParticipants : FC<EventParticipantsProps> = (props): ReactElement => { 

    const onSaveClick = () => {

    }

    return (
        <div>
            <div className="alert alert-success">Participants page</div>
            <div className="btn-toolbar justify-content-between">
                <button 
                    onClick={props.onBackClick}
                    type="button" 
                    className="btn btn-primary">Back</button>
                    
                                    
                <button 
                    onClick={onSaveClick}
                    type="button" 
                    className="btn btn-success">Save changes</button>                
            </div>
        </div>
    );
}

export default EventParticipants;