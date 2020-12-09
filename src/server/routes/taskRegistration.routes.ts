import { Router } from 'express';
import TaskRegistrationController from '../controllers/taskRegistration.controller';
const router = new (Router as any)();

const taskRegistrationController = new TaskRegistrationController();

// Create new user registration on task
router.route('/createtaskregistration').post(taskRegistrationController.CreateTaskRegistration);

// Get all tasks that the user registred
router.route('/getuserregistrations/:id').get(taskRegistrationController.GetRegisteredTasksOfUserById);

// Get all user registration on tasks
router.route('/gettasktregistrations/:id').get(taskRegistrationController.GetRegisteredUsersOfTaskById);

// Delete one user registration by id
router.route('/deleteuserregistration/:id').delete(taskRegistrationController.DeleteUserRegistrationsById);

// Delete one user registration by id
router.route('/setuserconfirmation').post(taskRegistrationController.SetUserConfirmationOnTaskById);

export default router;