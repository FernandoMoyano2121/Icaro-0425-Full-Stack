import express from "express";
const app = express();

// -----------------------------------------------------------------------------
// RESUMEN: ¿CUÁNDO USAR CADA MÉTODO?
// -----------------------------------------------------------------------------
//
// | Método  | Propósito           | Datos en   | Ejemplo de uso           |
// |---------|---------------------|------------|--------------------------|
// | GET     | Leer/Obtener        | URL/Query  | Listar productos         |
// | POST    | Crear nuevo         | Body       | Registrar usuario        |
// | PUT     | Reemplazar completo | Body       | Actualizar perfil entero |
// | PATCH   | Modificar parcial   | Body       | Cambiar solo el email    |
// | DELETE  | Eliminar            | URL        | Borrar una cuenta        |
//
// -----------------------------------------------------------------------------

/* GET */
app.get("/usuarios", (req, res) => {
  res.send("Acá se mostraría el listado de usuarios");
});

/* POST */
app.post("/usuarios", (req, res) => {
  //req.body; //contendria los datos enviados
  res.send("Usuario creado");
});

/* PUT */
app.put("/usuarios/:id", (req, res) => {
  res.send(`Usuario ${req.params.id} actualizado`);
});

/* PATCH */
app.patch("/usuarios/:id", (req, res) => {
  //generalmente se utiliza para:
  // CAmbiar una contraseña
  //Actualizar algun dato del perfil
  //Cambiar alguna preferencia de configuración
  res.send(`Usuario ${req.params.id} fue actualizado parcialmente `);
});

/* DELETE */
app.delete("/usuarios/:id", (req, res) => {
  //generalmente se utiliza para:
  // CAmbiar una contraseña
  //Actualizar algun dato del perfil
  //Cambiar alguna preferencia de configuración
  res.send(`Usuario ${req.params.id} eliminado `);
});

app.listen(3000, () => {
  console.log("servidor corriendo");
});
