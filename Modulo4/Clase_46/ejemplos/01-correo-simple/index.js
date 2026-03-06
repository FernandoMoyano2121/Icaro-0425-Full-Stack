import "dotenv/config";
import nodemailer from "nodemailer";

// =============================================================================
// PASO 1 — Crear el Transporter
// createTransport() recibe un objeto con la configuración del servidor SMTP.
// Los valores vienen del archivo .env para no exponer credenciales en el código.
// =============================================================================
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST, // servidor SMTP (ej: sandbox.smtp.mailtrap.io)
  port: process.env.MAIL_PORT, // puerto (2525 Mailtrap / 587 Gmail con TLS)
  auth: {
    user: process.env.MAIL_USER, // usuario SMTP
    pass: process.env.MAIL_PASS, // contraseña o app password
  },
});

export default transporter;

// =============================================================================
// VERIFICAR CONEXIÓN — transporter.verify()
// Antes de enviar conviene verificar que las credenciales son correctas.
// verify() intenta conectarse al servidor SMTP y devuelve true o error.
// Equivale a "hacer un ping" al servidor de correo.
// =============================================================================
async function verificarConexion() {
  console.log("Verificando conexion a servidor SMTP");
  try {
    await transporter.verify();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// =============================================================================
// PASO 2 — Definir las opciones del correo (mailOptions)
// Este objeto describe el correo: quién lo manda, a quién va, qué dice.
//
// Propiedades principales:
//   from    →  remitente visible (nombre + dirección)
//   to      →  destinatario/s (string o array separado por comas)
//   subject →  asunto del correo
//   text    →  cuerpo en TEXTO PLANO (siempre incluirlo como fallback)
//   html    →  cuerpo en HTML enriquecido (lo vemos en el ejemplo 02)
// =============================================================================
const mailOptions = {
  from: process.env.MAIL_FROM,
  to: "alumno@ejemplo.com",
  subject: "¡Bienvenido a Tienda Icaro!",
  text: `
Hola!

Gracias por registrarte en Tienda Icaro.
Tu cuenta fue creada exitosamente.

Si no creaste esta cuenta, ignorá este mensaje.

Saludos,
El equipo de Tienda Icaro
  `,
};

// =============================================================================
// PASO 3 — Enviar el correo con sendMail()
// sendMail() es asincrónico. Devuelve un objeto "info" con:
//   info.messageId  →  ID único del mensaje (útil para debugging)
//   info.response   →  respuesta del servidor SMTP
//   info.accepted   →  array de destinatarios que aceptaron el correo
//   info.rejected   →  array de destinatarios rechazados
// =============================================================================
async function enviarCorreo() {
  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Correo enviado exitosamente!");
  console.log("   messageId:", info.messageId);
  console.log("   Aceptados:", info.accepted);

  // En Mailtrap podés ver el correo en tu dashboard
  // En Gmail llega a la bandeja real del destinatario
}

// =============================================================================
// Función principal
// =============================================================================
async function main() {
  try {
    await verificarConexion();
    await enviarCorreo();
  } catch (error) {
    console.log(error.message);
  }
}

main();
