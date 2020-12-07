import { Router } from 'express';
import RegistrationController from '../controllers/registration.controller';
const router = new (Router as any)();

const registrationController = new RegistrationController();

// Create new user registration on event
router.route('/createregistration').post(registrationController.CreateRegistration);

// Get all user registration on events
router.route('/getuserregistrations/:id').get(registrationController.GetAllUserRegistrationById);

export default router;