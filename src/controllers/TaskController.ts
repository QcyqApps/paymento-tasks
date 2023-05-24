import { Request, Response } from "express";
import TaskService from "../services/TaskService";
import TaskValidator from "../validators/TaskValidator";

class TaskController {
    private readonly taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    public createTask(req: Request, res: Response): void {
        const { error } = TaskValidator.validateTaskCreate(req.body);

        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { title, description, startDate, deadline } = req.body;
        const task = this.taskService.createTask(title, description, startDate, deadline);
        res.status(201).json(task);
    }

    public editTask(req: Request, res: Response): void {
        const taskId = parseInt(req.params.id, 10);
        const { error } = TaskValidator.validateTaskEdit(req.body);

        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { title, description, startDate, deadline } = req.body;
        const task = this.taskService.editTask(taskId, title, description, startDate, deadline);

        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    }

    public async getTask(req: Request, res: Response): Promise<void> {
        const taskId = parseInt(req.params.id, 10);
        const task = await this.taskService.getTaskById(taskId);

        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    }

    public async getAllTasks(req: Request, res: Response): Promise<void> {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const tasks = await this.taskService.getTasksByPage(page, limit);
        res.json(tasks);
    }
}

export default TaskController;
