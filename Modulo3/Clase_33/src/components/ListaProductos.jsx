import { useCarritoStore } from "../store/carritoStore";

// eslint-disable-next-line react-refresh/only-export-components
export const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  },
  seccion: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
  },
  productos: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  productoCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    background: "#f8f9fa",
    borderRadius: "5px",
  },
  productoNombre: {
    flex: 1,
  },
  productoPrecio: {
    fontWeight: "bold",
    marginRight: "10px",
  },
  botonAgregar: {
    padding: "5px 15px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  itemCarrito: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  controlesCantidad: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  botonCantidad: {
    width: "25px",
    height: "25px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    borderRadius: "3px",
  },
  cantidad: {
    minWidth: "30px",
    textAlign: "center",
  },
  botonEliminar: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  total: {
    marginTop: "15px",
    padding: "10px",
    background: "#e9ecef",
    borderRadius: "5px",
    textAlign: "right",
    fontSize: "18px",
  },
  botonVaciar: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  vacio: {
    textAlign: "center",
    color: "#6c757d",
    fontStyle: "italic",
  },
};

// Productos de ejemplo (normalmente vendrían de una API)
const productosDisponibles = [
  { id: 1, nombre: "🍕 Pizza", precio: 1500 },
  { id: 2, nombre: "🍔 Hamburguesa", precio: 1200 },
  { id: 3, nombre: "🌮 Tacos", precio: 800 },
  { id: 4, nombre: "🍟 Papas Fritas", precio: 500 },
  { id: 5, nombre: "🥤 Gaseosa", precio: 400 },
];

//COMPONENTE 1: Lista de Productos
export const ListaProductos = () => {
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);

  return (
    <div style={styles.seccion}>
      <h3>🛍️ Productos Disponibles</h3>
      <div style={styles.productos}>
        {productosDisponibles.map((producto) => (
          <div key={producto.id} style={styles.productoCard}>
            <span style={styles.productoNombre}>{producto.nombre}</span>
            <span style={styles.productoPrecio}>${producto.precio}</span>
            <button
              onClick={() => agregarProducto(producto)}
              style={styles.botonAgregar}
            >
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
