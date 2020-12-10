import { DateRange } from "./DateRange";
import { UserType } from "./UserType";

export interface IUser {
    _id: string;
    email: string;
    password: string; 
    firstName: string;
    lastName: string;
    userType: UserType;
    skills: string;
    availability: Array<DateRange>;
}