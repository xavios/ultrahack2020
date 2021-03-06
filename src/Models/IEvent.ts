import { Status } from "./Status";

export interface IEvent {
    _id?: string;
    name?: string;
    status: Status,
    startDate?: Date,
    endDate?: Date,
    location?: string,
    volunteersNumber?: number,
    capacity?: number,
    description?: string,
    requiredSkills?: string,
    recommendedSkills?: string,
}