export const Boton2 = ({ mensaje }) => {
  const handleClick = (mensaje) => {
    console.log(mensaje);
  };

  return <button onClick={() => handleClick(mensaje)}>Click Aquí</button>;
};
