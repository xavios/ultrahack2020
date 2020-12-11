  
import mongoose from 'mongoose';
import { Response, Request } from 'express';
import User, { IUser } from '../models/user.model';
import EventRegistration from '../models/eventRegistration.model';
import TaskRegistration from '../models/taskRegistration.model';

export default class UserController {
    
    public async CreateUser(req: Request, res: Response): Promise<void> {
        try {
            const user = req.body as Pick<
                IUser, 
                'email' |
                'password' |
                'firstName' |
                'lastName' |
                'userType' |
                'skills' |
                'availability' |
                'phone' |
                'address' |
                'photo'>

            const newUser: IUser = await User.create(user);
            res.status(201).json({ message: 'User added', user: newUser })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async GetUserById(req: Request, res: Response): Promise<void> {
        try {
            const user: IUser = await User.findById(req.params.id)
            if (!user) {
                res.status(404).send('No user found');
            }
            res.status(200).json({ user })
        } catch (error) {
            res.status(500).send(error);
        }
    }
        
    public async GetAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users: IUser[] = await User.find()
            if (!users) {
                res.status(404).send('No users found');
            }
            res.status(200).json({ users })
        } catch (error) {
            res.status(500).send(error);
        }
    }
        
    public async DeleteUserById(req: Request, res: Response): Promise<void> {
        const params = req.params as Pick<IUser, "id">
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await EventRegistration.deleteMany({ userId: params.id }).session(session);
            await TaskRegistration.deleteMany({ userId: params.id }).session(session);
            const deletedUser: IUser = await User.findByIdAndRemove(params.id).session(session);
            if (!deletedUser) {
                res.status(404).send('No user found');
            }
            res.status(200).json({ user: deletedUser });
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            res.status(500).send(error);
        } finally {
            session.endSession();
        }
    }
        
    public async UpdateUser(req: Request, res: Response) : Promise<void> {
        const user = req.body as Pick<
            IUser, 
            '_id' |
            'email' |
            'password' |
            'firstName' |
            'lastName' |
            'userType' |
            'skills' |
            'availability' |
            'phone' |
            'address' |
            'photo'>
        
        try {
             const updatedUser: IUser = await User.findOneAndUpdate({ _id: user._id }, {
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: user.userType,
                skills: user.skills,
                availability: user.availability,
                phone: user.phone,
                address: user.address,
                photo: user.photo },
                { new: true, useFindAndModify: false });
             if (!updatedUser) {
                res.status(404).send('No user found');
            }
             res.status(200).json({
                message: 'User updated',
                user: updatedUser
            })
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

