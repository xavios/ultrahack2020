import mongoose, { Schema, Document } from 'mongoose';

export interface ITaskRegistration extends Document {
    _id: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    taskId: Schema.Types.ObjectId;
    confirmed: Boolean;
}

const TaskRegistrationSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true},
    confirmed: { type: Boolean, required: true, default: false }
});

export default mongoose.model<ITaskRegistration>('TaskRegistration', TaskRegistrationSchema);