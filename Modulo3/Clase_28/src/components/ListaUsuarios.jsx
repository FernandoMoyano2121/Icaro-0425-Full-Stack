import { useFetch } from "../hooks/useFetch";

export const ListaUsuarios = () => {
  const { datos, cargando, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {datos.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
