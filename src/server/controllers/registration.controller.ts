  
import { Response, Request } from 'express';
import Registration, { IRegistration } from '../models/registration.model';

export default class RegistrationController {
    
    public async CreateRegistration(req: Request, res: Response): Promise<void> {
            const registration = req.body as Pick<
                IRegistration,
                    "_id" |
                    "userId" | 
                    "eventId" |
                    "confirmed">
        try {
            const existingRegistration: IRegistration = await Registration.findOne({ eventId: registration.eventId,  userId: registration.userId});
            if (existingRegistration) {
                res.status(200).send("User already has a registration on this event");
            } else {
                const newRegistration: IRegistration = await Registration.create(registration);
                res.status(201).json({ message: 'New event registration created', registration: newRegistration });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async GetRegistratedEventsOfUserById(req: Request, res: Response): Promise<void> {
        const params = req.params as Pick<IRegistration, "id">;

        try {
            const registrations: IRegistration[] = await Registration.find({ userId: params.id }).populate("eventId");
            if (!registrations) {
                res.status(404).send('No registration found');
            }
            res.status(200).json({ registrations })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async GetRegisteredUsersOfEventById(req: Request, res: Response): Promise<void> {
        const params = req.params as Pick<IRegistration, "id">;

        try {
            const registrations: IRegistration[] = await Registration.find({ eventId: params.id }).populate("userId");
            if (!registrations) {
                res.status(404).send('No registration found');
            }
            res.status(200).json({ registrations })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async DeleteUserRegistrationsById(req: Request, res: Response): Promise<void> {
        const params = req.params as Pick<IRegistration, "id">

        try {
            const deletedRegistration: IRegistration = await Registration.findOneAndDelete({ userId: params.id });
            if (!deletedRegistration) {
                res.status(404).send('No registration found');
            }
            res.status(200).json({ deletedRegistration })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async SetUserConfirmationOnEventById(req: Request, res: Response): Promise<void> {
        const registration = req.body as Pick<
            IRegistration,
                "userId" | 
                "eventId" |
                "confirmed">

        try {
            const updatedRegistration: IRegistration = 
                await Registration.findOneAndUpdate(
                    { userId: registration.userId, eventId: registration.eventId }, 
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

