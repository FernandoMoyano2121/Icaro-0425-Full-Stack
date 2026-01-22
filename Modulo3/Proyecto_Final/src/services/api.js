// =============================================
// SERVICIO API - Consumo de JSONPlaceholder
// =============================================
// Función para obtener tareas desde la API externa.

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTasks = async (limite = 5) => {
  const response = await fetch(`${API_URL}?_limit=${limite}`);

  //validacion
  if (!response.ok) {
    throw new Error("Error al cargar las tareas");
  }
  const data = await response.json();
  return data;
};
