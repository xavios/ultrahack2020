import mongoose, { Schema, Document } from 'mongoose';
import BaseRegistrationSchema, { IBaseRegistration } from './baseRegistration.model';

export interface ITaskRegistration extends IBaseRegistration {
    taskId: Schema.Types.ObjectId;
}

const TaskRegistrationSchema: Schema = new BaseRegistrationSchema({
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true},
});

export default mongoose.model<ITaskRegistration>('TaskRegistration', TaskRegistrationSchema);