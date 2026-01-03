import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const { usuario, login, logout } = useAuth();

  return (
    <div>
      {usuario ? (
        <>
          <h1>Bienvenido: {usuario}</h1>
          <button onClick={logout}>Cerrar sesion</button>
        </>
      ) : (
        <>
          <button onClick={() => login("Federico")}>Iniciar sesion</button>
        </>
      )}
    </div>
  );
};
