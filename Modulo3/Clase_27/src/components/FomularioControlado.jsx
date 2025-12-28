import { useState } from "react";

export const FomularioControlado = () => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  /*   const validarInput = () => {
    if (!nombre) {
      alert("Éste campo es obligatorio");
    }
  }; */

  /*   const handleSubmit = (event) => {
    event.preventDefault();

    if (!nombre) {
      alert("Éste campo es obligatorio");
    }
  }; */

  console.log(nombre);

  return (
    <div>
      <form>
        <label>Nombre: </label>
        <input
          value={nombre}
          type="text"
          placeholder="Ingresa tu nombre"
          onChange={(e) => setNombre(e.target.value)}
        />

        <div>
          <label>Password: </label>
          <input
            value={password}
            type="password"
            placeholder="Ingresa la contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button>Enviar</button>
      </form>
    </div>
  );
};
