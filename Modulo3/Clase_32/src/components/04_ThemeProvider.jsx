import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const temaPersonalizado = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#af4c51", // Verde - color principal
      light: "#81C784", // Versión clara (generada automáticamente si no se especifica)
      dark: "#388E3C", // Versión oscura
      contrastText: "#fff", // Color del texto sobre este fondo
    },

    // Color secundario - usado para elementos de acento
    secondary: {
      main: "#FF9800", // Naranja
      light: "#FFB74D",
      dark: "#F57C00",
      contrastText: "#000",
    },

    background: {
      default: "#f5f5f5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px 24px",
        },
      },
    },
  },
});

const ThemeProviderEjemplo = () => {
  return (
    <ThemeProvider theme={temaPersonalizado}>
      <div>
        <Button variant="contained" color="primary">
          Bóton primario
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default ThemeProviderEjemplo;
