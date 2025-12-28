import { useRef } from "react";

export const FormularioNoControlado = () => {
  const inputRef = useRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return (
    <form>
      <label>Nombre</label>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Enviar</button>
    </form>
  );
};
