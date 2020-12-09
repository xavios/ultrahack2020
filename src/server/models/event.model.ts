  
import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    status: string,
    startDate: Date,
    endDate: Date,
    location: string,
    volunteersNumber?: number,
    capacity?: number,
    description?: string,
    requiredSkills?: string,
    recommendedSkills?: string
}

export enum Status { 
    openForRegistration = 'openForRegistration',
    closed = 'closed'
}

const EventSchema: Schema = new Schema({
    name: { type: String, required: true },
    status: { type: String, enum: Object.values(Status) },
    startDate: { type: Date },
    endDate: { type: Date },
    location: { type: String },
    volunteersNumber: { type: Number },
    capacity: { type: Number },
    description: { type: String },
    requiredSkills: { type: String },
    recommendedSkills: { type: String },
    released: { type: Boolean, required: true, default: false }
});

export default mongoose.model<IEvent>('Event', EventSchema);