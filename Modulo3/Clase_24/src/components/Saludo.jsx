import React from "react";

export const Saludo = ({ nombre, edad }) => {
  return (
    <div>
      <h2>Hola {nombre}!</h2>
      <h2>Edad: {edad} </h2>
    </div>
  );
};
