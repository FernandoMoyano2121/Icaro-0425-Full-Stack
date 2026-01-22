// =============================================
// PÁGINA - TaskDetail
// =============================================
// Muestra el detalle de una tarea específica.
// Usa useParams para obtener el ID de la URL.

import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./TaskDetail.module.css";
import { useTaskStore } from "../../store/useTaskStore";

export const TaskDetail = () => {
  // Obtener el ID de la URL

  const { id } = useParams();

  // Buscar la tarea en el store
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTask = useTaskStore((state) => state.toggleTask);

  // Buscar tarea por ID (convertir a número)
  const task = tasks.find((t) => t.id === Number(id));

  // Si no existe la tarea
  if (!task) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h2>Tarea no encontrada</h2>
          <p>La tarea que buscas no existe.</p>
          <Link to="/" className={styles.backLink}>
            ← Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Link para volver */}
      <Link to="/" className={styles.backLink}>
        ← Volver al inicio
      </Link>

      {/* Tarjeta de detalle */}
      <div className={styles.card}>
        {/* Estado */}
        <span
          className={`${styles.badge} ${task.completed ? styles.completed : styles.pending}`}
        >
          {task.completed ? "✓ Completada" : "○ Pendiente"}
        </span>

        {/* Título */}
        <h1 className={styles.title}>{task.title}</h1>

        {/* Info */}
        <p className={styles.info}>
          <strong>ID:</strong> {task.id}
        </p>

        {/* Botón para cambiar estado */}
        <button onClick={() => toggleTask(task.id)} className={styles.button}>
          {task.completed ? "Marcar como pendiente" : "Marcar como completada"}
        </button>
      </div>
    </div>
  );
};
