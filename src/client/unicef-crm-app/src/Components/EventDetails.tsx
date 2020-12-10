import React, { FC, ReactElement, useState } from "react";
import { IEvent } from "../Models/IEvent"
import BasicEventData from "./BasicEventData";
import EventParticipants from "./EventParticipants";

type EventDetailProps = {
    event: IEvent;
    onBackClick: () => void
}

type EventDetailState = {
    event: IEvent;
    selectedTab: string;
}

const EventDetails : FC<EventDetailProps> = (props): ReactElement => { 
    const [state, setState] = useState({
        event: props,
        selectedTab: "basic",
    })

    const onBreadCrumbClick = (selectedTab: string) => {
        setState({ ...state, selectedTab: selectedTab});
    }


    return (
        <div>        
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className={state.selectedTab === "basic" ? "breadcrumb-item breadcrumb-selected" : "breadcrumb-item"} 
                        onClick={() => onBreadCrumbClick("basic")}>Event information</li>
                    <li className={state.selectedTab === "participants" ? "breadcrumb-item breadcrumb-selected" : "breadcrumb-item"} 
                        onClick={() => onBreadCrumbClick("participants")}>Manage participants</li>
                </ol>
            </nav>
            { state.selectedTab === "basic" && <BasicEventData event={props.event} onBackClick={props.onBackClick} />}
            { state.selectedTab === "participants" && <EventParticipants event={props.event} onBackClick={props.onBackClick} />}

        </div>
    );
}

export default EventDetails;