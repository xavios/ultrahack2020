import React from "react";

import FullCalendar from '@fullcalendar/react'
import { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import EventApiClient from "../Api/EventApiClient";
import EventInfo from "./EventInfo";
import { IEvent } from "../Models/IEvent";
import { EventStatus } from "../Models/EventStatus";

interface ICalendarViewProps {

}

interface ICalendarViewState {
    selectedEvent?: IEvent;
}

export default class CalendarView extends React.Component<ICalendarViewProps, ICalendarViewState> {
    private eventApiClient : EventApiClient;

    constructor(props: any) {
        super(props);
        this.eventApiClient = new EventApiClient();
        this.state = {
            selectedEvent: undefined
        };
    }

    render() {     
        if (this.state.selectedEvent) {
            return (<EventInfo event={this.state.selectedEvent} onBackClick={this.onBackClick} />);
        } 

        return (<FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            customButtons={{
                addEventButton: {
                    text: 'Add new Event',
                    click: this.onAddEventClick,
                },
            }} 
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'addEventButton'
            }}
            initialView="dayGridMonth"
            eventClick={this.onEventClick}           
            events={this.eventApiClient.getEvents()} />);
        
    }

    onAddEventClick = () => {
        this.setState( { selectedEvent: {
            id: undefined,
            name: "New Event",
            date: new Date("2020.12.06."),
            status: EventStatus.openForRegistration,
            location: "Budapest"
        }})
    }

    onBackClick = () => {
        this.setState({ selectedEvent: undefined });
    }

    onEventClick = (arg: EventClickArg) => {
        const eventId = parseInt(arg.event.id);
        const event : IEvent = this.eventApiClient.get(eventId);
        this.setState({ selectedEvent: event });
    }
}