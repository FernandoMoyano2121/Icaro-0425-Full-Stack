import { useForm } from "react-hook-form";

export const FormularioAvanzado = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <textarea
            {...register("mensaje")}
            placeholder="Escribe tu mensaje Aquí"
          ></textarea>
        </div>

        <div>
          <select {...register("opcion")}>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
          </select>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
