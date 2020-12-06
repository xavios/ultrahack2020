import React from "react";

import FullCalendar from '@fullcalendar/react'
import { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import IEventApiClient from "../Api/IEventApiClient";
import EventApiClient from "../Api/EventApiClient";
import { CalendarEvent } from "../Models/CalendarEvent";
import EventInfo from "./EventInfo";

interface ICalendarViewProps {

}

interface ICalendarViewState {
    selectedEvent?: CalendarEvent;
}

export default class CalendarView extends React.Component<ICalendarViewProps, ICalendarViewState> {
    private eventApiClient : IEventApiClient;

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
            id: "",
            title: "New Event",
            start: "2020.12.06.",
            end: "2020.12.07.",
            allDay: true
        }})
    }

    onBackClick = () => {
        this.setState({ selectedEvent: undefined });
    }

    onEventClick = (arg: EventClickArg) => {
        this.setState({ selectedEvent: {
            id: arg.event.id,
            title: arg.event.title,
            start: arg.event.startStr,
            end: arg.event.endStr,
            allDay: arg.event.allDay
        } });
    }
}