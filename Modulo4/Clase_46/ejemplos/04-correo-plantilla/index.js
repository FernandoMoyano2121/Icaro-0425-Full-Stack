import "dotenv/config";
import nodemailer from "nodemailer";

import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// En módulos ES (cuando usamos "type: \"module\"" o archivos .mjs),
// no existen las variables globales de CommonJS como __filename y __dirname.
//
// Aquí las reconstruimos a partir de import.meta.url:
// 1) fileURLToPath(import.meta.url) convierte la URL del módulo actual
//    (por ejemplo "file:///C:/.../index.js") en una ruta de sistema de archivos.
//    El resultado se guarda en __filename.
// 2) dirname(__filename) obtiene la carpeta que contiene ese archivo,
//    y se guarda en __dirname.
//
// Así podemos usar __dirname como si estuviéramos en un módulo CommonJS.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// =============================================================================
// DATOS DEL USUARIO
// En producción estos datos vendrían del body del request (req.body)
// después de que el usuario se registra mediante un formulario.
// =============================================================================
const usuario = {
  nombre: "María González",
  email: "maria@ejemplo.com",
  fecha: new Date().toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
};

// =============================================================================
// FUNCIÓN: cargar y personalizar la plantilla
//
// 1. fs.readFile() lee el archivo .html y lo devuelve como string
// 2. .replaceAll('{{campo}}', valor) reemplaza cada marcador con el dato real
//    Las llaves dobles {{}} son la convención que muestran las diapos.
//    También se podría usar Handlebars o EJS para casos más complejos.
// =============================================================================
async function cargarPlantilla(rutaPlantilla, datos) {
  let html = await fs.readFile(rutaPlantilla, "utf-8");

  html = html.replaceAll("{{nombre}}", datos.nombre);
  html = html.replaceAll("{{email}}", datos.email);
  html = html.replaceAll("{{fecha}}", datos.fecha);

  return html;
}

async function main() {
  try {
    await transporter.verify();
    const rutaPlantilla = join(__dirname, "template", "bienvenida.html");

    const htmlPersonalizado = await cargarPlantilla(rutaPlantilla, usuario);

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: usuario.email,
      subject: `¡Bienvenida, ${usuario.nombre}! Tu cuenta está lista 🎉`,
      text: `Hola ${usuario.nombre}! Tu cuenta en Tienda Icaro fue creada el ${usuario.fecha}.`,
      html: htmlPersonalizado, // ← HTML con las variables ya reemplazadas
    };
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
}

main();
