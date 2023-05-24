import TaskRepository from "../src/repositories/TaskRepository";
import Task from "../src/models/Task";

export default class MockController {
    constructor(private readonly taskRepository: TaskRepository) {}

    public mockCreateTask(): Promise<Task | null>  {
        return this.taskRepository.createTask(
            "New Task", "Task description", new Date(), new Date());
    }
}
