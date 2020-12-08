import { EventStatus } from "./EventStatus";

export interface IEvent {
    id?: string;
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