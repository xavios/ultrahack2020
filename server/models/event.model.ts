  
import mongoose, { Schema } from 'mongoose';
import BaseSubjectSchema, { IBaseSubjectSchema } from './baseSubject.model';

export interface IEvent extends IBaseSubjectSchema {
    startDate: Date,
    endDate: Date
}

const EventSchema: Schema = new BaseSubjectSchema({
    startDate: { type: Date },
    endDate: { type: Date }
});

export default mongoose.model<IEvent>('Event', EventSchema);