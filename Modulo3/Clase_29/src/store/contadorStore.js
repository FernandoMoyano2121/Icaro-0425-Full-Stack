//Crear el store
import { create } from "zustand";

//la funcion recibe "set" que me permite actualizar el estado
export const useContadorStore = create((set) => ({
  //ESTADO INCIAL
  contador: 0,

  //ACCIONES (funciones que modifican el estado)

  //usa el estado previo para calcular el nuevo valor
  incrementar: () =>
    set((state) => ({
      contador: state.contador + 1,
    })),

  decrementar: () =>
    set((state) => ({
      contador: state.contador - 1,
    })),

  resetear: () => set({ contador: 0 }),
}));
