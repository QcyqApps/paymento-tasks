import Task from "../models/Task";
import knex from "../config/database";

class TaskRepository {
    public async createTask(title: string, description: string, startDate: Date, deadline: Date): Promise<Task | null> {
        const [taskId] = await knex("tasks").insert({
            title,
            description,
            startDate,
            deadline,
        });

        return this.getTaskById(taskId);
    }

    public async editTask(
        id: number,
        title: string,
        description: string,
        startDate: Date,
        deadline: Date
    ): Promise<Task | null> {
        await knex("tasks")
            .where("id", id)
            .update({
                title,
                description,
                startDate,
                deadline,
                updatedAt: knex.fn.now(),
            });
        return this.getTaskById(id);
    }

    public async getTaskById(id: number): Promise<Task | null> {
        const task = await knex("tasks").where("id", id).first();
        return task || null;
    }

    public async getTasksByPage(offset: number, limit: number): Promise<Task[]> {
        return knex("tasks").offset(offset).limit(limit);
    }

    public async getAllTasks(): Promise<Task[]> {
        return knex("tasks");
    }

    public async getAllTasksCount(): Promise<number> {
        const count = await knex("tasks").count();
        return parseInt(count[0]["count(*)"].toString());
    }
}

export default TaskRepository;
