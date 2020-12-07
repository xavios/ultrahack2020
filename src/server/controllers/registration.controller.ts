  
import { Response, Request } from 'express'
import Registration, { IRegistration } from '../models/registration.model';

export default class RegistrationController {
    
    public async CreateRegistration(req: Request, res: Response): Promise<void> {
        try {
            const registration = req.body as Pick<
            IRegistration,
                "_id" |
                "userId" | 
                "eventId">
    
            const newRegistration: IRegistration = await Registration.create(registration);
            res.status(201).json({ message: 'New event registration created', registration: newRegistration })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async GetAllUserRegistrationById(req: Request, res: Response): Promise<void> {
        try {
            const registration: IRegistration[] = await Registration.find({ user: req.body.id }).populate("event");
            if (!registration) {
                res.status(404).send('No registration found');
            }
            res.status(200).json({ registration })
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

