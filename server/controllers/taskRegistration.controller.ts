  
import { Response, Request } from 'express';
import TaskRegistration, { ITaskRegistration } from '../models/taskRegistration.model';

export default class TaskRegistrationController {
    
    public async CreateTaskRegistration(req: Request, res: Response): Promise<void> {
            const registration = req.body as Pick<
                ITaskRegistration,
                    "_id" |
                    "userId" | 
                    "taskId" |
                    "confirmed">
        try {
            const existingRegistration: ITaskRegistration = await TaskRegistration.findOne({ taskId: registration.taskId,  userId: registration.userId});
            if (existingRegistration) {
                res.status(200).send("User already has a registration on this task");
            } else {
                const newRegistration: ITaskRegistration = await TaskRegistration.create(registration);
                res.status(201).json({ message: 'New task registration created', registration: newRegistration });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async GetRegisteredTasksOfUserById(req: Request, res: Response): Promise<void> {
        const params = req.params as Pick<ITaskRegistration, "id">;

        try {
            const registrations: ITaskRegistration[] = await TaskRegistration.find({ userId: params.id }).populate("taskId");
            if (!registrations) {
                res.status(404).send('No registration found');
            }
            res.status(200).json({ registrations })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async GetRegisteredUsersOfTaskById(req: Request, res: Response): Promise<void> {
        const params = req.params as Pick<ITaskRegistration, "id">;

        try {
            const registrations: ITaskRegistration[] = await TaskRegistration.find({ taskId: params.id }).populate("userId");
            if (!registrations) {
                res.status(404).send('No registration found');
            }
            res.status(200).json({ registrations })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async DeleteUserRegistrationsById(req: Request, res: Response): Promise<void> {
        const params = req.params as Pick<ITaskRegistration, "id">

        try {
            const success: Boolean = await TaskRegistration.deleteMany({ userId: params.id }) > 0;
            if (!success) {
                res.status(404).send('No registration found');
            }
            res.status(200).json({ success })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async SetUserConfirmationOnTaskById(req: Request, res: Response): Promise<void> {
        const registration = req.body as Pick<
            ITaskRegistration,
                "userId" | 
                "taskId" |
                "confirmed">

        try {
            const updatedRegistration: ITaskRegistration = 
                await TaskRegistration.findOneAndUpdate(
                    { userId: registration.userId, taskId: registration.taskId }, 
                    { confirmed: registration.confirmed },
                    { new: true, useFindAndModify: false});
            if (!updatedRegistration) {
                res.status(404).send('No registration found');
            }
            res.status(200).json({ updatedRegistration })
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

