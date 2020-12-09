import mongoose, { Schema, Document } from 'mongoose';

export interface IEventRegistration extends Document {
    _id: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    eventId: Schema.Types.ObjectId;
    confirmed: Boolean;
}

const EventRegistrationSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true},
    confirmed: { type: Boolean, required: true, default: false }
});

export default mongoose.model<IEventRegistration>('EventRegistration', EventRegistrationSchema);