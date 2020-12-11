import mongoose, { Schema, Document } from 'mongoose';
import BaseRegistrationSchema, { IBaseRegistration } from './baseRegistration.model';

export interface IEventRegistration extends IBaseRegistration {
    eventId: Schema.Types.ObjectId;
}

const EventRegistrationSchema: Schema = new BaseRegistrationSchema({
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true}
});

export default mongoose.model<IEventRegistration>('EventRegistration', EventRegistrationSchema);