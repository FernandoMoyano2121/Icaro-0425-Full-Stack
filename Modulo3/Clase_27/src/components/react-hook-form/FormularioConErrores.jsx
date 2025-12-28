import React from "react";
import { useForm } from "react-hook-form";

export const FormularioConErrores = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre: </label>
          <input
            {...register("nombre", {
              required: "El nombre es obligatorio",
            })}
            placeholder="ingresa tu nombre"
          />
        </div>

        <div>
          <label>Email: </label>
          <input
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "El formato del email no es valido",
              },
            })}
            placeholder="Ingresa tu email"
            type="email"
          />
          {errors.nombre && <p>{errors.nombre.message}</p>}

          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

/* 

formState = {
  errors,
  isValid,
  isSubmitting,
  isDirty,
  touchedFields,
};

*/
