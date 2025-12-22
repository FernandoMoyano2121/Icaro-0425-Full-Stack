import React, { useEffect, useState } from "react";

export const Cronometro = () => {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    //Iniciamos un intervalo que actualiza el contador cada segundo
    const intervalo = setInterval(() => {
      setContador((prevContador) => prevContador + 1);
    }, 1000);

    const timeOut = setTimeout(() => {
      clearInterval(intervalo);
      console.log("Intervalo detenido");
    }, 5000);

    return () => {
      clearInterval(intervalo);
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <div>
      <h1>Cronometro</h1>
      <p>Tiempo transcurrido: {contador} segundos</p>
    </div>
  );
};
