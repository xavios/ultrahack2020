  
import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    status: string,
    date: Date,
    location: string,
    volunteersNumber?: number,
    capacity?: number,
    description?: string,
    requiredSkills?: string,
    recommendedSkills?: string
}

export interface IJoinUser extends Document {
    confirmed: Boolean;
}

export enum Status { 
    openForRegistration = 'openForRegistration',
    closed = 'closed'
}

const EventSchema: Schema = new Schema({
    name: { type: String, required: true },
    status: { type: String, enum: Object.values(Status) },
    date: { type: Date },
    location: { type: String },
    volunteersNumber: { type: Number },
    capacity: { type: Number },
    description: { type: String },
    requiredSkills: { type: String },
    recommendedSkills: { type: String }
});

export default mongoose.model<IEvent>('Event', EventSchema);