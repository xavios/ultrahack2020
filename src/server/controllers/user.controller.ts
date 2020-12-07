  
import { Response, Request } from 'express';
import User, { IUser } from '../models/user.model';

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
        try {
            const deletedUser: IUser = await User.findByIdAndRemove(req.params.id)
            if (!deletedUser) {
                res.status(404).send('No user found');
            }
            res.status(200).json({ user: deletedUser })
        } catch (error) {
            res.status(500).send(error);
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
             const updatedUser: IUser = await User.findOneAndUpdate(user._id, user, { new: true });
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

