// ============================================
// PÁGINAS SIMPLES (en una app real estarían en archivos separados)
// ============================================

import { BrowserRouter, Route, Routes } from "react-router";

export const Home = () => {
  return (
    <div style={styles.pagina}>
      <h1>🏠 Página de Inicio</h1>
      <p>Bienvenido a nuestra aplicación con React Router</p>
      <p style={styles.info}>
        Cambiá la URL a <code>/about</code> para ver la otra página
      </p>
    </div>
  );
};

export const About = () => {
  return (
    <div style={styles.pagina}>
      <h1>ℹ️ Acerca de Nosotros</h1>
      <p>Esta es la página "About" de nuestra aplicación</p>
      <p style={styles.info}>
        Volvé a <code>/</code> para ir al inicio
      </p>
    </div>
  );
};

export const EjemploBasico = () => {
  return (
    /**
     * BrowserRouter DEBE envolver todo lo que use rutas
     * Usa la History API del navegador para manejar las URLs
     */
    <BrowserRouter>
      <Routes>
        {/**
         * Routes es el contenedor de todas las rutas
         * Solo renderiza UNA ruta a la vez (la que coincide con la URL)
         */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    background: "#007bff",
    color: "white",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    textAlign: "center",
  },
  pagina: {
    background: "#f8f9fa",
    padding: "40px",
    borderRadius: "8px",
    textAlign: "center",
    minHeight: "200px",
  },
  info: {
    background: "#e7f3ff",
    padding: "10px",
    borderRadius: "4px",
    marginTop: "20px",
  },
  footer: {
    marginTop: "20px",
    padding: "15px",
    background: "#fff3cd",
    borderRadius: "8px",
    textAlign: "center",
  },
};
