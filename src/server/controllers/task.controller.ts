import mongoose from 'mongoose';
import { Response, Request } from 'express';
import Task, { ITask } from '../models/task.model';
import TaskRegistration from '../models/taskRegistration.model';

export default class TaskController {
    
    public async CreateTask(req: Request, res: Response): Promise<void> {
        const task = req.body as Pick<
            ITask,
                "_id" |
                "name" | 
                "status" | 
                "deadLine" |
                "location" |
                "volunteersNumber" |
                "capacity" |
                "description" |
                "requiredSkills" |
                "recommendedSkills" |
                "done" >

        try {
            const newTask: ITask = await Task.create(task);
            res.status(201).json({ message: 'Task added', task: newTask })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async GetTaskById(req: Request, res: Response): Promise<void> {
        try {
            const task: ITask = await Task.findById(req.params.id);
            if (!task) {
                res.status(404).send('No task found');
            }
            res.status(200).json({ task })
        } catch (error) {
            res.status(500).send(error);
        }
    }
        
    public async GetAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks: ITask[] = await Task.find();
            if (!tasks) {
                res.status(404).send('No tasks found');
            }
            res.status(200).json({ tasks })
        } catch (error) {
            res.status(500).send(error);
        }
    }
        
    public async DeleteTaskById(req: Request, res: Response): Promise<void> {
        const params = req.params as Pick<ITask, "id">
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await TaskRegistration.deleteMany({ taskId: params.id }).session(session);
            const deletedTask: ITask = await Task.findByIdAndRemove(params.id).session(session);
            if (!deletedTask) {
                res.status(404).send('No task found');
            }
            res.status(200).json({ task: deletedTask });
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            res.status(500).send(error);
        } finally {
            session.endSession();
        }
    }
        
    public async UpdateTask(req: Request, res: Response) : Promise<void> {
            const task = req.body as Pick<
                ITask,
                "_id" |
                "name" | 
                "status" | 
                "deadLine" |
                "location" |
                "volunteersNumber" |
                "capacity" |
                "description" |
                "requiredSkills" |
                "recommendedSkills" |
                "done" >
        try {
            const updatedTask: ITask = 
                await Task.findByIdAndUpdate(task._id, task, { new: true, useFindAndModify: false });
            if (!updatedTask) {
                res.status(404).send('No task found');
            }
             res.status(200).json({
                message: 'Task updated',
                task: updatedTask
            })
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

