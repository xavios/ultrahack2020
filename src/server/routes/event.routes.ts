import { Router } from 'express';
import EventController from '../controllers/event.controller';
const router = new (Router as any)();

const eventController = new EventController();

// Get all Events
router.route('/getevents').get(eventController.GetAllEvents);

// Get one event by id
router.route('/getevent/:id').get(eventController.GetEventById);

// Add a new event
router.route('/createevent').post(eventController.CreateEvent);

// Update one event
router.route('/updateevent').post(eventController.UpdateEvent);

// Delete an event by id
router.route('/deleteevent/:id').delete(eventController.DeleteEventById);

export default router;