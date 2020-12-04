  
import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
    name: string;
    status: string,
    date: Date,
    location: string,
    volunteersNumber?: number,
    capacity?: number,
    description?: string,
    requiredSkills?: string,
    recommendedSkills?: string,
}

export enum Status { 
    openForRegistration = 'openForRegistration',
    closed = 'closed',
    //TODO: extend with possible options
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
    recommendedSkills: { type: String },
    confirmedVolunteers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    registeredVolunteers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    //TODO: join table?
});

export default mongoose.model<IEvent>('Event', EventSchema);