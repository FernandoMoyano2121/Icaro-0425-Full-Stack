import "./EjemploCSSTradicional.css";

const CardTradicional = () => {
  return (
    <div className="card">
      <h2 className="card-titulo">Card con CSS Tradicional</h2>
      <p className="card-texto">
        Los estilos vienen del archivo EjemploCSSTradicional.css importado
        arriba. Usamos className para asignar las clases.
      </p>
      <button className="card-boton">Ver más</button>
    </div>
  );
};

export const EjemploCSSTradicional = () => {
  return (
    <div className="ejemplo-css-container">
      <header className="ejemplo-header">
        <h1>Ejemplo 2 Css Tradicional , archivo separado</h1>
      </header>
      <main className="ejemplo-main">
        <section className="ejemplo-seccion">
          <CardTradicional />
        </section>
      </main>
    </div>
  );
};

export default EjemploCSSTradicional;
