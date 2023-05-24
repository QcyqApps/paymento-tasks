import TaskController from "../controllers/TaskController";
const express = require("express");

const router = express.Router();
const taskController = new TaskController();

router.post("/tasks", taskController.createTask.bind(taskController));
router.put("/tasks/:id", taskController.editTask.bind(taskController));
router.get("/tasks/:id", taskController.getTask.bind(taskController));
router.get("/tasks", taskController.getAllTasks.bind(taskController));

export default router;
