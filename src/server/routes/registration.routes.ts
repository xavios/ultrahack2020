import { Router } from 'express';
import RegistrationController from '../controllers/registration.controller';
const router = new (Router as any)();

const registrationController = new RegistrationController();

// Create new user registration on event
router.route('/createregistration').post(registrationController.CreateRegistration);

// Get all events that the user registred
router.route('/getuserregistrations/:id').get(registrationController.GetRegistratedEventsOfUserById);

// Get all user registration on events
router.route('/geteventregistrations/:id').get(registrationController.GetRegisteredUsersOfEventById);

// Delete one user registration by id
router.route('/deleteuserregistration/:id').delete(registrationController.DeleteUserRegistrationsById);

// Delete one user registration by id
router.route('/setuserconfirmation').post(registrationController.SetUserConfirmationOnEventById);

export default router;