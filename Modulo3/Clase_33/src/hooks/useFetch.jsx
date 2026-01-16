const API_KEY = import.meta.env.VITE_API_KEY;

export const obtenerDatos = () => {
  try {
    fetch(`https://api.ejemplo.com/data?key=${API_KEY}`);
  } catch (error) {
    console.log(error);
  }
};
