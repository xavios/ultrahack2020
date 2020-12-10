import React from "react";

import FullCalendar from '@fullcalendar/react'
import { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import EventApiClient from "../Api/EventApiClient";
import { IEvent } from "../Models/IEvent";
import { EventStatus } from "../Models/EventStatus";
import { EventViewModel } from "../Models/EventViewModel";
import Configuration from "../Api/Configuration";
import EventDetails from "./EventDetails";

interface ICalendarViewProps {

}

interface ICalendarViewState {
    selectedEvent?: IEvent;
    events: EventViewModel[];
}

export default class CalendarView extends React.Component<ICalendarViewProps, ICalendarViewState> {
    private eventApiClient : EventApiClient;
        
    constructor(props: ICalendarViewProps) {
        super(props);
        this.eventApiClient = new EventApiClient();
        this.state = {
            selectedEvent: undefined,
            events: []
        };

    }

    componentDidMount(){
        fetch(`${Configuration.serviceBaseUrl}/events/getevents`, {
            method: 'GET'
        })
        .then((resp) => resp.json())
        .then((response) => {
            const events = response.events.map((e: any) => {
                let vm : EventViewModel = {
                    id: e._id,
                    title: e.name,
                    start: e.startDate,
                    end: e.endDate,
                    allDay: true
                };
                return vm;

            });
           this.setState({ selectedEvent: undefined, events: events });
        });
    }

    render() {     
        if (this.state.selectedEvent) {
            return (<EventDetails event={this.state.selectedEvent} onBackClick={this.onBackClick} />);
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
            events={this.state.events} 
            />);
        
    }

    onAddEventClick = () => {
        this.setState({ selectedEvent: {
            _id: undefined,
            name: "New Event",
            startDate: new Date("2020.12.06."),
            endDate: new Date("2020.12.06"),
            status: EventStatus.openForRegistration,
            location: "Budapest",
            capacity: 3,
            description: "This is the latest unicef event",
            requiredSkills: "speech",
            recommendedSkills: "luck"
        }})
    }

    onBackClick = () => {
        this.componentDidMount();
    }

    onEventClick = async (arg: EventClickArg) => {
        const eventId = arg.event.id;
        const event : IEvent = await this.eventApiClient.get(eventId);
        this.setState({ selectedEvent: event });
    }
}