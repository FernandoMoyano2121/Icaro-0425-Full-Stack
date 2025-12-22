export const RenderizadoDeListas = ({ personajes }) => {
  return (
    <ul>
      {personajes.map((personaje) => (
        <div>
          <li key={personaje.id}></li>
          <h3>{personaje.nombre}</h3>
          <img style={{ width: "300px" }} src={personaje.imagen} alt="imagen" />
        </div>
      ))}
    </ul>
  );
};
