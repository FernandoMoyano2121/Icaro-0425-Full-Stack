import React, { useState } from "react";

export const Contador = () => {
  //const[estadoInicial, FuncionModificadoraDelEstado]=useState(valorInicial)
  const [numero, setNumero] = useState(0);

  //OPCION 3
  /*     const handleIncrement = () => {
    setNumero(numero + 1);
  };
 */

  //OPCION  2
  function handleIncrement() {
    setNumero(numero + 1);
  }

  /*   const handleReset = () => setNumero(0); */
  /*   const handleDecrement = () => setNumero(numero - 1); */

  return (
    <div>
      <p>El contador está en: {numero}</p>
      {/* OPCION 1 Funcion flecha inline */}
      {/*  <button onClick={() => setNumero(numero + 1)}>Incrementar</button> */}

      {/* OPCION 2 Pasar directamente una funcion flecha */}
      {/*  <button onClick={handleIncrement}>Incrementar</button> */}

      <button onClick={() => setNumero(numero - 1)}>Decrementar</button>
      {/* <button onClick={handleDecrement}></button> */}

      <button onClick={() => setNumero(0)}>Reset</button>
      {/* <button onClick={handleReset}></button> */}

      {/* OPCION 3 Pasar directamente una funcion nombrada */}
      <button onClick={handleIncrement}>Incrementar</button>
    </div>
  );
};
