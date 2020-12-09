import { Router } from 'express';
import EventRegistrationController from '../controllers/eventRegistration.controller';
const router = new (Router as any)();

const eventRegistrationController = new EventRegistrationController();

// Create new user registration on event
router.route('/createeventregistration').post(eventRegistrationController.CreateEventRegistration);

// Get all events that the user registred
router.route('/getuserregistrations/:id').get(eventRegistrationController.GetRegisteredEventsOfUserById);

// Get all user registration on events
router.route('/geteventregistrations/:id').get(eventRegistrationController.GetRegisteredUsersOfEventById);

// Delete one user registration by id
router.route('/deleteuserregistration/:id').delete(eventRegistrationController.DeleteUserRegistrationsById);

// Delete one user registration by id
router.route('/setuserconfirmation').post(eventRegistrationController.SetUserConfirmationOnEventById);

export default router;