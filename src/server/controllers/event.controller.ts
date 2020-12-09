import mongoose from 'mongoose';
import { Response, Request } from 'express';
import Event, { IEvent } from '../models/event.model';
import EventRegistration from '../models/eventRegistration.model';

export default class EventController {
    
    public async CreateEvent(req: Request, res: Response): Promise<void> {
        const event = req.body as Pick<
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
                "recommendedSkills" >

        try {
            const newEvent: IEvent = await Event.create(event);
            res.status(201).json({ message: 'Event added', event: newEvent })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async GetEventById(req: Request, res: Response): Promise<void> {
        try {
            const event: IEvent = await Event.findById(req.params.id);
            if (!event) {
                res.status(404).send('No event found');
            }
            res.status(200).json({ event })
        } catch (error) {
            res.status(500).send(error);
        }
    }
        
    public async GetAllEvents(req: Request, res: Response): Promise<void> {
        try {
            const events: IEvent[] = await Event.find();
            if (!events) {
                res.status(404).send('No events found');
            }
            res.status(200).json({ events })
        } catch (error) {
            res.status(500).send(error);
        }
    }
        
    public async DeleteEventById(req: Request, res: Response): Promise<void> {
        const params = req.params as Pick<IEvent, "id">
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await EventRegistration.deleteMany({ eventId: params.id }).session(session);
            const deletedEvent: IEvent = await Event.findByIdAndRemove(params.id).session(session);
            if (!deletedEvent) {
                res.status(404).send('No event found');
            }
            res.status(200).json({ event: deletedEvent });
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            res.status(500).send(error);
        } finally {
            session.endSession();
        }
    }
        
    public async UpdateEvent(req: Request, res: Response) : Promise<void> {
            const event = req.body as Pick<
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
                "recommendedSkills" >
        try {
            const updatedEvent: IEvent = 
                await Event.findOneAndUpdate({ _id: event._id } , {
                    name: event.name,
                    status: event.status,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    location: event.location,
                    volunteersNumber: event.volunteersNumber,
                    capacity: event.capacity,
                    description: event.description,
                    requiredSkills: event.requiredSkills,
                    recommendedSkills: event.requiredSkills
                }, { new: true, useFindAndModify: false });
            if (!updatedEvent) {
                res.status(404).send('No event found');
            }
             res.status(200).json({
                message: 'Event updated',
                event: updatedEvent
            })
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

