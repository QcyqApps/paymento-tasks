import knex from "../config/database";
import TaskRepository from "../repositories/TaskRepository";
import Task from "../models/Task";
import MockController from "../../__mocks__/mockController";

describe("TaskRepository", () => {
    let taskRepository: TaskRepository;
    let mockController: MockController;

    beforeAll(() => {
        return knex.migrate.latest();
    });

    afterAll(() => {
        return knex.migrate.rollback();
    });

    beforeEach(() => {
        taskRepository = new TaskRepository();
        mockController = new MockController(taskRepository);
    });

    describe("createTask", () => {
        it("should create a new task", async () => {
            const title = "New Task";
            const description = "Task description";
            const createdTask = await mockController.mockCreateTask();

            expect(createdTask).toBeDefined();
            expect(createdTask?.title).toBe(title);
            expect(createdTask?.description).toBe(description);
            expect(createdTask?.startDate).toBeInstanceOf(Date);
            expect(createdTask?.deadline).toBeInstanceOf(Date);
        });
    });

    describe("editTask", () => {
        it("should edit an existing task", async () => {
            const createdTask = await mockController.mockCreateTask();

            const taskId = createdTask?.id;
            const updatedTitle = "Updated Task";
            const updatedDescription = "Updated description";
            const updatedStartDate = new Date();
            const updatedDeadline = new Date();

            const editedTask = await taskRepository.editTask(
                taskId!,
                updatedTitle,
                updatedDescription,
                updatedStartDate,
                updatedDeadline
            );

            expect(editedTask).toBeDefined();
            expect(editedTask?.id).toBe(taskId);
            expect(editedTask?.title).toBe(updatedTitle);
            expect(editedTask?.description).toBe(updatedDescription);
            expect(editedTask?.startDate).toBeInstanceOf(Date);
            expect(editedTask?.deadline).toBeInstanceOf(Date);
        });

        it("should return null for non-existing task", async () => {
            const taskId = 9999;
            const updatedTitle = "Updated Task";
            const updatedDescription = "Updated description";
            const updatedStartDate = new Date();
            const updatedDeadline = new Date();

            const editedTask = await taskRepository.editTask(
                taskId,
                updatedTitle,
                updatedDescription,
                updatedStartDate,
                updatedDeadline
            );

            expect(editedTask).toBeNull();
        });
    });

    describe("getAllTasksCount", () => {
        it("should return the count of all tasks as number", async () => {
            await taskRepository.createTask("Task 1", "Description 1", new Date(), new Date());
            await taskRepository.createTask("Task 2", "Description 2", new Date(), new Date());
            await taskRepository.createTask("Task 3", "Description 3", new Date(), new Date());

            const count = await taskRepository.getAllTasksCount();

            expect(count).toBeGreaterThan(0);
        });
    });

    describe("getTaskById", () => {
        it("should return a task by ID", async () => {
            const createdTask = await mockController.mockCreateTask();
            const taskId = createdTask?.id;
            const task = await taskRepository.getTaskById(taskId!);

            expect(task).toBeDefined();
            expect(task?.id).toBe(taskId);
        });

        it("should return null for non-existing task", async () => {
            const taskId = 9999;
            const task = await taskRepository.getTaskById(taskId);

            expect(task).toBeNull();
        });
    });

    describe("getTasksByPage", () => {
        it("should return tasks by page", async () => {
            const createdTasks: Task[] = [];
            for (let i = 0; i < 5; i++) {
                const createdTask = await taskRepository.createTask(`Task ${i + 1}`,
                    "Description", new Date(), new Date());
                createdTasks.push(createdTask!);
            }

            const totalTasks = await taskRepository.getAllTasksCount();
            const limit = 5;
            const offset = totalTasks - limit;
            const tasks = await taskRepository.getTasksByPage(offset, limit);

            expect(tasks).toHaveLength(limit);
            expect(tasks[0].id).toBe(createdTasks[0].id);
            expect(tasks[1].id).toBe(createdTasks[1].id);
            expect(tasks[2].id).toBe(createdTasks[2].id);
        });
    });

    describe("getAllTasks", () => {
        it("should return all tasks", async () => {
            const createdTasks: Task[] = [];
            for (let i = 0; i < 3; i++) {
                const createdTask = await taskRepository.createTask(`Task ${i + 1}`, "Description", new Date(), new Date());
                createdTasks.push(createdTask!);
            }

            const tasks = await taskRepository.getAllTasks();

            expect(tasks[tasks.length - 3].id).toBe(createdTasks[0].id);
            expect(tasks[tasks.length - 2].id).toBe(createdTasks[1].id);
            expect(tasks[tasks.length - 1].id).toBe(createdTasks[2].id);
        });
    });
});
