  
import { Response, Request } from 'express';
import EventRegistration, { IEventRegistration } from '../models/eventRegistration.model';

export default class EventRegistrationController {
    
    public async CreateEventRegistration(req: Request, res: Response): Promise<void> {
            const registration = req.body as Pick<
                IEventRegistration,
                    "_id" |
                    "userId" | 
                    "eventId" |
                    "confirmed">
        try {
            const existingRegistration: IEventRegistration = await EventRegistration.findOne({ eventId: registration.eventId,  userId: registration.userId});
            if (existingRegistration) {
                res.status(200).send("User already has a registration on this event");
            } else {
                const newRegistration: IEventRegistration = await EventRegistration.create(registration);
                res.status(201).json({ message: 'New event registration created', registration: newRegistration });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async GetRegisteredEventsOfUserById(req: Request, res: Response): Promise<void> {
        const params = req.params as Pick<IEventRegistration, "id">;

        try {
            const registrations: IEventRegistration[] = await EventRegistration.find({ userId: params.id }).populate("eventId");
            if (!registrations) {
                res.status(404).send('No registration found');
            }
            res.status(200).json({ registrations })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async GetRegisteredUsersOfEventById(req: Request, res: Response): Promise<void> {
        const params = req.params as Pick<IEventRegistration, "id">;

        try {
            const registrations: IEventRegistration[] = await EventRegistration.find({ eventId: params.id }).populate("userId");
            if (!registrations) {
                res.status(404).send('No registration found');
            }
            res.status(200).json({ registrations })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async DeleteUserRegistrationsById(req: Request, res: Response): Promise<void> {
        const params = req.params as Pick<IEventRegistration, "id">

        try {
            const success: Boolean = await EventRegistration.deleteMany({ userId: params.id }) > 0;
            if (!success) {
                res.status(404).send('No registration found');
            }
            res.status(200).json({ success })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async SetUserConfirmationOnEventById(req: Request, res: Response): Promise<void> {
        const registration = req.body as Pick<
            IEventRegistration,
                "userId" | 
                "eventId" |
                "confirmed">

        try {
            const updatedRegistration: IEventRegistration = 
                await EventRegistration.findOneAndUpdate(
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

