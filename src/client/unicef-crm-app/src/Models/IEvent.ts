import { EventStatus } from "./EventStatus";

export interface IEvent {
    _id?: string;
    name?: string;
    status: EventStatus,
    date?: Date,
    location?: string,
    volunteersNumber?: number,
    capacity?: number,
    description?: string,
    requiredSkills?: string,
    recommendedSkills?: string,
}