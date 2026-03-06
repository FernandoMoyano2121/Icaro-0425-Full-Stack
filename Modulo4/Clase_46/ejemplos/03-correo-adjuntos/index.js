// =============================================================================
// CLASE 46 - EJEMPLO 03: Correo con adjuntos
// ARCHIVO: ejemplos/03-correo-adjuntos/index.js
// EJECUCIÓN: node ejemplos/03-correo-adjuntos/index.js
// =============================================================================
//
// Los adjuntos se configuran mediante la propiedad "attachments".
// Es un ARRAY donde cada elemento es un objeto que describe un archivo.
//
// FORMAS DE DEFINIR UN ADJUNTO:
// ─────────────────────────────────────────────────────────────────────
//   path     →  ruta al archivo en el servidor (lo más común)
//   content  →  contenido directo como string, Buffer o Stream
//   href     →  URL pública del archivo (Nodemailer lo descarga y adjunta)
// ─────────────────────────────────────────────────────────────────────
//
// PROPIEDAD cid (Content-ID):
// Además de adjuntar archivos como "archivos descargables", los adjuntos
// se pueden EMBEBER dentro del HTML del correo usando el cid.
// Eso lo vemos en el ejemplo 04 con las imágenes de plantilla.
//
// CASOS DE USO reales para adjuntos:
//   - Factura de compra (PDF)
//   - Comprobante de pago
//   - Ticket de evento
//   - Informe generado dinámicamente
// =============================================================================

import "dotenv/config";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// En ES Modules no existe __dirname, lo calculamos manualmente
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
// ADJUNTOS — propiedad "attachments"
// Cada objeto del array representa un archivo adjunto.
//
//   filename  →  nombre que verá el destinatario en el adjunto
//   path      →  ruta absoluta al archivo en el servidor
//   contentType → tipo MIME del archivo (opcional, Nodemailer lo detecta solo)
//
// En un proyecto real esta ruta vendría generada dinámicamente.
// Por ejemplo, después de generar una factura en PDF con puppeteer o pdfkit.
// =============================================================================
const mailOptions = {
  from: process.env.MAIL_FROM,
  to: "juan@ejemplo.com",
  subject: "🧾 Tu factura de compra — Tienda Icaro",
  text: "Hola Juan! Adjuntamos la factura de tu compra reciente en Tienda Icaro.",
  html: `
    <div style="font-family:Arial,sans-serif; max-width:600px; margin:0 auto;">
      <h2 style="color:#2563eb;">¡Gracias por tu compra!</h2>
      <p>Hola <strong>Juan</strong>, adjuntamos la factura correspondiente a tu pedido.</p>
      <p style="color:#64748b;">Número de factura: <strong>FAC-2024-00123</strong></p>
      <p style="color:#64748b;">Total: <strong>$815.996</strong></p>
      <hr style="border:1px solid #e2e8f0;">
      <p style="font-size:12px; color:#94a3b8;">
        Para consultas: soporte@tienda-icaro.com
      </p>
    </div>
  `,

  // ─── Adjuntos ────────────────────────────────────────────────────
  attachments: [
    {
      // Adjunto 1: archivo de texto simulando una factura
      // En producción sería un PDF generado dinámicamente
      filename: "factura-FAC-2024-00123.txt",
      path: join(__dirname, "assets", "factura.txt"),
      contentType: "text/plain",
    },
    {
      // Adjunto 2: contenido generado directamente en memoria
      // Útil cuando no querés guardar el archivo en disco primero
      filename: "resumen.txt",
      content: `Resumen de compra\nFecha: ${new Date().toLocaleDateString("es-AR")}\nTotal: $815.996`,
      contentType: "text/plain",
    },
  ],
};

async function main() {
  console.log("=".repeat(55));
  console.log(" EJEMPLO 03 — Correo con adjuntos");
  console.log("=".repeat(55));

  try {
    await transporter.verify();
    console.log("✅ Conexión SMTP verificada.\n");

    console.log("📧 Enviando correo con adjuntos...");
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Correo enviado!");
    console.log("   messageId:", info.messageId);
    console.log(
      '\n💡 En Mailtrap hacé click en "Attachments" para ver los archivos adjuntos.',
    );
    console.log("   Adjunto 1: factura-FAC-2024-00123.txt (leído desde disco)");
    console.log("   Adjunto 2: resumen.txt (generado en memoria)");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
  }
}

main();
