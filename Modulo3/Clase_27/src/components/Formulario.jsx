import { useState } from "react";

export const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (!nombre || !email) {
      alert("Todos los campos son obligatorios");
      return;
    }

    alert(`Formulario enviado \nNombre: ${nombre} \nEmail: ${email}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Nombre: </label>
          <input
            value={nombre}
            type="text"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label htmlFor="">Email: </label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <button>Enviar</button>
      </form>
    </div>
  );
};
