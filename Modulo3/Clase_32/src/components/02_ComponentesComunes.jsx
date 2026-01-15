import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export const ComponentesComunes = () => {
  //Estado para controlar los componentes
  const [modalAbierto, setModalAbierto] = useState(false);

  //Funciones para manejar el modal

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  return (
    <div>
      {/* ================================================================== */}
      {/* SECCIÓN 1: BOTONES                                                 */}
      {/* ================================================================== */}
      <section>
        <Typography variant="h6">Botones</Typography>
        <Button variant="contained" color="secondary">
          Haz click aquí
        </Button>
      </section>
      {/* ================================================================== */}
      {/* SECCIÓN 2: CAMPOS DE TEXTO (TextField)                            */}
      {/* ================================================================== */}
      <section>
        <Typography variant="h6">Campos de Texto</Typography>
        <TextField label="Nombre" variant="outlined" type="text">
          Haz click aquí
        </TextField>
      </section>
      {/* ================================================================== */}
      {/* SECCIÓN 3: TARJETAS (Card)                                        */}
      {/* ================================================================== */}
      <section>
        <Typography variant="h6">Cards</Typography>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h4">Titulo de la Tarjeta</Typography>
            <CardMedia
              height="140"
              component="img"
              image="https://placehold.co/400"
            ></CardMedia>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              culpa iure similique sed, autem omnis! Accusamus id debitis
              tempora blanditiis.
            </Typography>
          </CardContent>
        </Card>
      </section>
      {/* ================================================================== */}
      {/* SECCIÓN 4: MODALES/DIÁLOGOS (Dialog)                              */}
      {/* ================================================================== */}
      <section>
        <Typography variant="h6">Modales/Diálogos</Typography>

        <Button onClick={abrirModal}>Abrir Modal</Button>

        <Dialog
          open={modalAbierto}
          onClose={cerrarModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Modal de Ejemplo</DialogTitle>
          <DialogContent>
            <Typography> Este es el contenido del modal.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cerrarModal} variant="contained">
              Cancelar
            </Button>
            <Button onClick={cerrarModal} variant="outlined">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    </div>
  );
};
