import mongoose, { Schema, Document } from 'mongoose';

export interface IBaseSubjectSchema extends Document {
    _id: Schema.Types.ObjectId,
    name: string,
    status: string,
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

export default class BaseSubjectSchema extends Schema {
    constructor(definition?: mongoose.SchemaDefinition){
        super({
                name: { type: String, required: true },
                status: { type: String, enum: Object.values(Status) },
                deadLine: { type: Date },
                location: { type: String },
                volunteersNumber: { type: Number },
                capacity: { type: Number },
                description: { type: String },
                requiredSkills: { type: String },
                recommendedSkills: { type: String },
                released: { type: Boolean, required: true, default: false },    
                ...definition
            });
    }
};