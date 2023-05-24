import TaskRepository from "../repositories/TaskRepository";
import Task from "../models/Task";

class TaskService {
    private taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    public async createTask(title: string, description: string, startDate: Date, deadline: Date): Promise<Task | null> {
        return await this.taskRepository.createTask(title, description, startDate, deadline);
    }

    public async editTask(id: number, title: string, description: string, startDate: Date, deadline: Date): Promise<Task | null> {
        return await this.taskRepository.editTask(id, title, description, startDate, deadline);
    }

    public async getTaskById(id: number): Promise<Task | null> {
        return await this.taskRepository.getTaskById(id);
    }

    public async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.getAllTasks();
    }

    public async getTasksByPage(page: number, limit: number): Promise<Task[]> {
        const offset = (page - 1) * limit;
        return await this.taskRepository.getTasksByPage(offset, limit);
    }
}

export default TaskService;
