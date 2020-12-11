import { Router } from 'express';
import TaskController from '../controllers/task.controller';
const router = new (Router as any)();

const taskController = new TaskController();

// Get all tasks
router.route('/gettasks').get(taskController.GetAllTasks);

// Get one task by id
router.route('/gettask/:id').get(taskController.GetTaskById);

// Add a new task
router.route('/createtask').post(taskController.CreateTask);

// Update one task
router.route('/updatetask').post(taskController.UpdateTask);

// Delete an task by id
router.route('/deletetask/:id').delete(taskController.DeleteTaskById);

export default router;