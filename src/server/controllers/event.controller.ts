  
import { Response, Request } from 'express'
import { Mongoose, Schema } from 'mongoose';
import Event, { IEvent } from '../models/event.model';

// export interface IEventUser {
//     eventId: Schema.Types.ObjectId;
//     user: IJoinUser;
// }

export default class EventController {
    
    public async CreateEvent(req: Request, res: Response): Promise<void> {
        try {
            const event = req.body as Pick<
                IEvent,
                "_id" |
                "name" | 
                "status" | 
                "date" |
                "location" |
                "volunteersNumber" |
                "capacity" |
                "description" |
                "requiredSkills" |
                "recommendedSkills" >
    
            const newEvent: IEvent = await Event.create(event);
            res.status(201).json({ message: 'Event added', event: newEvent })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async GetEventById(req: Request, res: Response): Promise<void> {
        try {
            const event: IEvent = await Event.findById(req.body.id)
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
            const events: IEvent[] = await Event.find()
            if (!events) {
                res.status(404).send('No events found');
            }
            res.status(200).json({ events })
        } catch (error) {
            res.status(500).send(error);
        }
    }
        
    public async DeleteEventById(req: Request, res: Response): Promise<void> {
        try {
            const deletedEvent: IEvent = await Event.findByIdAndRemove(req.body.id)
            if (!deletedEvent) {
                res.status(404).send('No event found');
            }
            res.status(200).json({ event: deletedEvent })
        } catch (error) {
            res.status(500).send(error);
        }
    }
        
    public async UpdateEvent(req: Request, res: Response) : Promise<void> {

        const event = req.body as Pick<
                IEvent,
                "_id" |
                "name" | 
                "status" | 
                "date" |
                "location" |
                "volunteersNumber" |
                "capacity" |
                "description" |
                "requiredSkills" |
                "recommendedSkills" >
        try {
            const updatedEvent: IEvent = await Event.findOneAndUpdate(event._id, event, { new: true, useFindAndModify: false });
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

    // public async AddUserToEvent(req: Request, res: Response): Promise<void> {

    //     const userToEvent = req.body as Pick<IEventUser, "eventId" | "user">;

    //     try {

    //         const updatedEvent: IEvent = 
    //             await Event.findOneAndUpdate(
    //                { 
    //                    _id: userToEvent.eventId, 
    //                    users: {
    //                        "$not": {
    //                            "$elemMatch": { 
    //                                _id: userToEvent.user._id
    //                             }
    //                         }
    //                     }
    //                 }, { 
    //                     $addToSet: { 
    //                         users: userToEvent.user 
    //                     }
    //                 }, { 
    //                     new: true, 
    //                     useFindAndModify: false 
    //                 });
    //         if (!updatedEvent) {
    //            res.status(404).send('No event found');
    //         }

    //         await Event.findById(userToEvent.eventId).populate("users").exec(function(error, posts) {
    //             console.log(JSON.stringify(posts, null, "t"))
    //         });

    //         res.status(200).json({
    //            message: 'User(s) added',
    //            event: updatedEvent
    //         })
    //    } catch (error) {
    //        res.status(500).send(error);
    //    } 
    // }

    // public async UpdateUserConfirmed(req: Request, res: Response): Promise<void> {

    //     const userToEvent = req.body as Pick<IEventUser, "eventId" | "user">;

    //     try {

    //         const updatedEvent: IEvent = 
    //             await Event.findOneAndUpdate(
    //                 {   
    //                     _id: userToEvent.eventId, 
    //                     users: {
    //                         "$elemMatch": { 
    //                             _id: userToEvent.user._id
    //                         }
    //                     }
    //                 },{ 
    //                     $set: { "users.$.confirmed": userToEvent.user.confirmed }},
    //                 { 
    //                     new: true, 
    //                     useFindAndModify: false 
    //                 });
    //         if (!updatedEvent) {
    //            res.status(404).send('No event found');
    //         }
    //         res.status(200).json({
    //            message: 'User(s) added',
    //            event: updatedEvent
    //         })
    //    } catch (error) {
    //        res.status(500).send(error);
    //    } 
    // }
}

