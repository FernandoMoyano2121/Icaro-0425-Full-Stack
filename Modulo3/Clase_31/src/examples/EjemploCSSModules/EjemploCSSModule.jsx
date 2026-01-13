import styles from "./EjemploCSSModule.module.css";

// ============================================
// EJEMPLO BÁSICO: Usando clases de CSS Modules
// ============================================
export const CardModule = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitulo}>Card con CSS Modules</h2>
      <p className={styles.cardTexto}>
        Las clases se acceden como propiedades del objeto importado.
      </p>
      <button className={styles.cardBoton}>Ver más</button>
    </div>
  );
};

const EjemploCSSModule = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Ejemplo 3: CSS Modules</h1>
        <p>Archivos .module.css con scope local automático</p>
      </header>
      <main className={styles.main}>
        <CardModule />
      </main>
    </div>
  );
};

export default EjemploCSSModule;
