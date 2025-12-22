/*  EJEMPLO DE TARJETA DE PERSONAJES

import { useEffect, useState } from "react";

export const Personajes = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const obtenerPersonaje = async () => {
      try {
        const respuesta = await fetch(
          `https://thronesapi.com/api/v2/Characters/${contador}`
        );
        const data = await respuesta.json();
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Personaje no encontrado", error);
      }
    };

    obtenerPersonaje();
  }, [contador]);

  return (
    <div>
      <h1>Personaje de Game of Thrones</h1>
      {imageUrl ? (
        <img src={imageUrl} alt="Personaje" />
      ) : (
        <p>No hay imagen para mostrar</p>
      )}
      <div>
        <button onClick={() => setContador((prev) => Math.max(0, prev - 1))}>
          Prev
        </button>
        <button onClick={() => setContador((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

*/

import { useEffect, useState } from "react";

export const Personajes = () => {
  //const [imageUrl, setImageUrl] = useState("");
  //const [contador, setContador] = useState(0);

  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    const obtenerPersonaje = async () => {
      try {
        const respuesta = await fetch(
          `https://thronesapi.com/api/v2/Characters/`
        );
        const data = await respuesta.json();
        setPersonajes(data);
      } catch (error) {
        console.error("Personaje no encontrado", error);
      }
    };

    obtenerPersonaje();
  }, []);

  return (
    <div>
      <h1>Personajes de Game of Thrones</h1>
      <ul>
        {personajes.map((personaje) => (
          <li key={personaje.id}>
            <h3>{personaje.fullName}</h3>
            <img
              src={personaje.imageUrl}
              alt={personaje.firstName}
              style={{ width: "200px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
