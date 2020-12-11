import mongoose, { Schema, Document } from 'mongoose';

export enum UserType {
    administrator = 'administrator',
    volunteer = 'volunteer',
}

export interface Address extends Document {
    street: string;
    city: string;
    postCode: string;
}

export interface DateRange extends Document {
    from: { type: Date },
    to: {type: Date }
}

export interface Photo extends Document {
    image: { type: Buffer },
    contentType: {type: string }
}

export interface IUser extends Document {
    email: string;
    password: string; 
    firstName: string;
    lastName: string;
    userType: UserType;
    skills: string;
    availability: Array<DateRange>;
    phone?: string;
    address?: Address;
    photo?: Photo;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userType: { type: String, enum: Object.values(UserType), required: true },
    phone: { type: String },
    availability: [
        {
            from: { type: Date },
            to: {type: Date }
        }
    ],
    address: {
        street: { type: String },
        city: { type: String },
        postCode: { type: String }
    },
    photo: {
        image: { type: Buffer },
        contentType: {type: String }
    }
});

export default mongoose.model<IUser>('User', UserSchema);