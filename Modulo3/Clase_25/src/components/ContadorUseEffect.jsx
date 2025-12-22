import React, { useEffect, useState } from "react";

export const ContadorUseEffect = () => {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log(`El contador cambio, El nuevo valor es ${contador}`);
  }, [contador]);

  return (
    <div>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
      <div>{contador}</div>
    </div>
  );
};
