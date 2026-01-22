// =============================================
// PÁGINA - Home
// =============================================
// Página principal con formulario y lista de tareas.
// Usa useEffect para cargar tareas desde la API.

import React, { useEffect } from "react";
import { fetchTasks } from "../../services/api";
import styles from "./Home.module.css";
import { TaskForm } from "../../components/TaskForm/TaskForm";
import { useTaskStore } from "../../store/useTaskStore";
import { TaskCard } from "../../components/TaskCard/TaskCard";

export const Home = () => {
  // Obtener estado y acciones del store
  const tasks = useTaskStore((state) => state.tasks);
  const loading = useTaskStore((state) => state.loading);
  const error = useTaskStore((state) => state.error);
  const setTasks = useTaskStore((state) => state.setTasks);
  const setLoading = useTaskStore((state) => state.setLoading);
  const setError = useTaskStore((state) => state.setError);

  // Cargar tareas de la API al montar el componente

  useEffect(() => {
    const cargarTareas = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTasks(5);
        setTasks(data);
      } catch (err) {
        setError(`Error al cargar las tareas ${err}`);
      } finally {
        setLoading(false);
      }
    };
    // Solo cargar si no hay tareas

    //ERROR: 🔴lenght (mal escrito)
    if (tasks.length === 0) {
      cargarTareas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mis Tareas</h2>

      {/* Formulario para agregar */}
      <TaskForm />

      {/* Estado de carga */}
      {loading && <p className={styles.message}>Cargando...</p>}

      {/* Error */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Lista de tareas */}
      <div className={styles.list}>
        {tasks.length === 0 && !loading ? (
          <p className={styles.message}>No hay tareas. ¡Agrega una!</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};
