import {Router} from "express";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
    createTaskSchema,
    updateTaskSchema
} from "../validators/task.validator.js"

const router = Router();

router.post("/", validate(createTaskSchema), createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.patch("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;