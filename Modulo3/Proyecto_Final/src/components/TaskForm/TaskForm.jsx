// =============================================
// COMPONENTE - TaskForm
// =============================================
// Formulario para agregar nuevas tareas.
// Utiliza el custom hook useForm.

import { useForm } from "../../hooks/useForm";
import { useTaskStore } from "../../store/useTaskStore";
import styles from "./TaskForm.module.css";

export const TaskForm = () => {
  // Custom hook para manejar el input
  const { value, onChange, reset } = useForm("");

  // Acción del store
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!value.trim()) return;

    // Agregar tarea y limpiar input

    addTask(value);
    reset();
  };

  return (
    <div onSubmit={handleSubmit} className={styles.form}>
      <form>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Nueva Tarea..."
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Agregar
        </button>
      </form>
    </div>
  );
};
