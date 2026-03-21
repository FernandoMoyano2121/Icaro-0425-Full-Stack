import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { promises as fs } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

const UPLOADS_DIR = path.join(__dirname, "uploads");
const TEMP_DIR = path.join(__dirname, "tmp");

await fs.mkdir(UPLOADS_DIR, { recursive: true });
await fs.mkdir(TEMP_DIR, { recursive: true });

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: TEMP_DIR,
  }),
);

app.post("/upload", async (req, res) => {
  // Si no llegaron archivos, req.files es null o undefined

  if (!req.files || !req.files.photo) {
    return res
      .status(400)
      .json({ error: 'No se recibió ningún archivo en el campo "photo".' });
  }

  const archivo = req.files.photo;

  const destino = path.join(UPLOADS_DIR, archivo.name);
  await archivo.mv(destino);

  console.log(
    "Archivo recibido:",
    archivo.name,
    `(${(archivo.size / 1024).toFixed(2)} KB)`,
  );

  res.status(201).json({
    mensaje: "✅ Archivo subido correctamente.",
    nombreOriginal: archivo.name,
    tipo: archivo.mimetype,
    tamaño: `${(archivo.size / 1024).toFixed(2)} KB`,
    destino,
  });
});

app.listen(PORT, () => {
  console.log("=".repeat(55));
  console.log(" EJEMPLO 04 — express-fileupload");
  console.log("=".repeat(55));
  console.log(`\n🚀 Servidor en http://localhost:${PORT}`);
  console.log("\nProbá con Thunder Client:");
  console.log("  POST http://localhost:" + PORT + "/upload");
  console.log('  Body: form-data → campo "photo" → seleccionar un archivo');
  console.log("\nComparación con Multer:");
  console.log("  → Multer guarda automáticamente con diskStorage");
  console.log("  → express-fileupload requiere llamar .mv() manualmente");
  console.log("  → express-fileupload conserva el nombre original (sin hash)");
});
