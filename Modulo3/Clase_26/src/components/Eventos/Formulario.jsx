export const Formulario = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulario enviado");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};
