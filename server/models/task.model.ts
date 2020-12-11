  
import mongoose, { Schema, Document } from 'mongoose';
import BaseSubjectSchema, { IBaseSubjectSchema, Status } from './baseSubject.model';

export interface ITask extends IBaseSubjectSchema {
    deadLine: Date,
    done: Boolean
}

const TaskSchema: Schema = new BaseSubjectSchema({
    deadLine: { type: Date },
    done: { type: Boolean, required: true, default: false }
});

export default mongoose.model<ITask>('Task', TaskSchema);