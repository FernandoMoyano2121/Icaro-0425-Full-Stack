import { BrowserRouter, Link, Route, Routes } from "react-router";

// ============================================
// NAVBAR CON LINKS
// ============================================

export const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>
        🏠Inicio
      </Link>

      <Link to="/about" style={styles.link}>
        ℹ️ Acerca de
      </Link>

      <Link to="/contacto" style={styles.link}>
        📧 Contacto
      </Link>
    </nav>
  );
};

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

export const Contacto = () => {
  return (
    <div style={styles.pagina}>
      <h1>📧 Contacto</h1>
      <p>Pagina de Contacto</p>
    </div>
  );
};

export const EjemploNavegacion = () => {
  return (
    <BrowserRouter>
      <div style={styles.container}>
        <header style={styles.header}>
          <h2> Navegación con Link</h2>
        </header>

        <NavBar />
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
      </div>
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
    background: "#28a745",
    color: "white",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    textAlign: "center",
  },
  nav: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    padding: "15px",
    background: "#f8f9fa",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  link: {
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
  main: {
    minHeight: "300px",
  },
  pagina: {
    background: "#f8f9fa",
    padding: "40px",
    borderRadius: "8px",
    textAlign: "center",
  },
  comparacion: {
    marginTop: "20px",
    textAlign: "left",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
  },
  codigo: {
    display: "block",
    background: "#1e1e1e",
    color: "#9cdcfe",
    padding: "15px",
    borderRadius: "5px",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
  },
  footer: {
    marginTop: "20px",
    padding: "15px",
    background: "#d4edda",
    borderRadius: "8px",
    textAlign: "center",
  },
};
