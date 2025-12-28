import { useForm } from "react-hook-form";

export const FormularioBasico = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Nombre :</label>
        <input
          {...register("nombre")}
          placeholder={"Ingresa el nombre"}
          type="text"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
