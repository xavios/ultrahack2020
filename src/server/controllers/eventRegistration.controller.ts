import { Response, Request } from 'express';
import { IUser } from '../models/user.model';
import { IEvent } from '../models/event.model';
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
            let response = CreateUserRegistrationsResponse(registrations);
            res.status(200).json(response);
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
            let response = CreateEventRegistrationsResponse(registrations);
            res.status(200).json(response);
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

const CreateEventRegistrationsResponse = (registrations:IEventRegistration[]): Object =>  {
    let response = { eventId: registrations[0].eventId, users: new Array<Object>() };
        registrations.forEach(r => {
            let user = r.toObject().userId as Pick<
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
                'photo'>;

                response.users.push(
                    {
                        _id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userType: user.userType,
                        skills: user.skills,
                        availability: user.availability,
                        phone: user.phone,
                        address: user.address,
                        photo: user.photo
                    }
                );
            }
        );
    return response;
}

const CreateUserRegistrationsResponse = (registrations:IEventRegistration[]): Object =>  {
    let response = { userId: registrations[0].userId, events: new Array<Object>() };
        registrations.forEach(r => {
            let event = r.toObject().eventId as Pick<
                IEvent, 
                "_id" |
                "name" | 
                "status" | 
                "startDate" |
                "endDate" |
                "location" |
                "volunteersNumber" |
                "capacity" |
                "description" |
                "requiredSkills" |
                "recommendedSkills" >;

                response.events.push(
                    {
                        _id: event._id,
                        name: event.name,
                        status: event.status,
                        startDate: event.startDate,
                        endDate: event.endDate,
                        location: event.location,
                        volunteersNumber: event.volunteersNumber,
                        capacity: event.capacity,
                        description: event.description,
                        requiredSkills: event.requiredSkills,
                        recommendedSkills: event.recommendedSkills
                    }
                );
            }
        );
    return response;
}

