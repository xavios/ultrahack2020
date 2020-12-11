import { Status } from "./Status";

export interface ITask {
    _id?: string;
    name?: string;
    status: Status,
    deadLine?: Date,
    location?: string,
    volunteersNumber?: number,
    capacity?: number,
    description?: string,
    requiredSkills?: string,
    recommendedSkills?: string,
    done?: Boolean
}