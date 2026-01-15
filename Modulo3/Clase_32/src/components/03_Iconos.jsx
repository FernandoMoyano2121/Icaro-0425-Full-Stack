import Typography from "@mui/material/Typography";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export const Iconos = () => {
  return (
    <div>
      <h2>Ejemplo 3 : Iconos de Material UI</h2>

      <section>
        <Typography variant="h6">Tamaño de Iconos</Typography>

        <div>
          <AddAlertIcon color="primary" fontSize="large" />
        </div>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddShoppingCartIcon />}
        >
          Comprar
        </Button>
      </section>
    </div>
  );
};
