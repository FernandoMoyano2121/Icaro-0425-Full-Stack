import { useContador } from "../hooks/useContador";

export const Contador = () => {
  const { contador, incrementar, decrementar, resetear } = useContador(10);

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button onClick={incrementar}>Incrementar</button>
      <button onClick={decrementar}>Decrementar</button>
      <button onClick={resetear}>Resetear</button>
    </div>
  );
};
