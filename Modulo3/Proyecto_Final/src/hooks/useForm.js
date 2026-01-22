import { useState } from "react";

export const useForm = (valorInicial = "") => {
  const [value, setValue] = useState(valorInicial);

  const handleChange = (e) => setValue(e.target.value);
  const reset = () => setValue(valorInicial);

  //Error : 🔴 onchange (mal escrito)
  return { value, onChange: handleChange, reset };
};
