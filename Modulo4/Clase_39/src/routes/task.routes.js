import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask,
} from "../controllers/TaskController.js";

const router = Router();

// GET    /api/tasks      → Listar todas las tareas

router.get("/tasks", listTasks);

// GET    /api/tasks/:id  → Obtener una tarea por ID
router.get("/tasks/:id", getTask);

// POST   /api/tasks      → Crear nueva tarea
router.post("/tasks", createTask);

// PUT    /api/tasks/:id  → Actualizar tarea existente
router.put("/tasks/:id", updateTask);

// DELETE /api/tasks/:id  → Eliminar tarea
router.delete("/tasks/:id", deleteTask);

export default router;
