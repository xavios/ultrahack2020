import mongoose, { Schema, Document } from 'mongoose';

export interface IBaseRegistration extends Document {
    _id: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    confirmed: Boolean;
}

export default class BaseRegistrationSchema extends Schema {
    constructor(definition?: mongoose.SchemaDefinition){
        super({
                userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
                confirmed: { type: Boolean, required: true, default: false },       
                ...definition
            });
    }
}