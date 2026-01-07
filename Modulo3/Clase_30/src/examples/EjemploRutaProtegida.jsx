import { Navigate, Outlet } from "react-router";

export const EjemploRutaProtegida = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
