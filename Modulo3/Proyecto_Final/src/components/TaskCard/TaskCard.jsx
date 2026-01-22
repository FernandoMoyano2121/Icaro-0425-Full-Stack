// =============================================
// COMPONENTE - TaskCard
// =============================================
// Tarjeta individual de tarea.
// Incluye link al detalle, checkbox y botón eliminar.

import React from "react";
import { useTaskStore } from "../../store/useTaskStore";
import styles from "./TaskCard.module.css";
import { Link } from "react-router-dom";

export const TaskCard = ({ task }) => {
  //Acciones del store

  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <div className={`${styles.card} ${task.completed ? styles.completed : ""}`}>
      {/* Checkbox para completar */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className={styles.checkbox}
      />
      {/* Título con link al detalle */}

      <Link to={`/task/${task.id}`} className={styles.title}>
        {task.title}
      </Link>

      {/* Botón eliminar */}
      <button onClick={() => deleteTask(task.id)} className={styles.deleteBtn}>
        ✕
      </button>
    </div>
  );
};
