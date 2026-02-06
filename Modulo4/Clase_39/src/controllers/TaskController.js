import { Task } from "../models/Task.js";

/**
 * Listar todas las tareas
 * GET /api/tasks
 */
export const listTasks = (req, res) => {
  const all = Task.findAll();
  res.json(all);
};

/**
 * Obtener una tarea por ID
 * GET /api/tasks/:id
 */
export const getTask = (req, res) => {
  const task = Task.findById(+req.params.id);
  if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
  res.json(task);
};

/**
 * Crear una nueva tarea
 * POST /api/tasks
 * Body: { "title": "Mi tarea" }
 */
export const createTask = (req, res) => {
  const { title } = req.body;
  if (!title)
    return res.status(400).json({ error: "El titulo es obligatorio" });
  const task = Task.create({ title });
  res.status(201).json(task);
};

/**
 * Actualizar tarea existente
 * PUT /api/tasks/:id
 * Body: { "title": "Nuevo título", "completed": true }
 */
export const updateTask = (req, res) => {
  const id = +req.params.id;
  const updated = Task.update(id, req.body);
  if (!updated) return res.status(404).json({ error: "Tarea no encontrada" });
  res.json(updated);
};

/**
 * Eliminar tarea
 * DELETE /api/tasks/:id
 */
export const deleteTask = (req, res) => {
  const success = Task.delete(+req.params.id);
  if (!success) return res.status(404).json({ error: "Tarea no encontrada" });
  res.status(204).end();
};
