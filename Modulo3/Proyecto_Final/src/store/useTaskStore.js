// =============================================
// STORE DE ZUSTAND - Estado Global de Tareas
// =============================================
// Zustand permite manejar estado global de forma simple.
// Este store contiene las tareas y las acciones para modificarlas.

import { create } from "zustand";

export const useTaskStore = create((set) => ({
  //Estado
  tasks: [],
  loading: false,
  error: null,

  //Acciones

  setTasks: (tasks) => set({ tasks }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addTask: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: Date.now(),
          title,
          completed: false,
        },
      ],
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
