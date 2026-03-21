import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { promises as fs } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

const UPLOADS_DIR = path.join(__dirname, "uploads");
await fs.mkdir(UPLOADS_DIR, { recursive: true });

const upload = multer({ dest: UPLOADS_DIR });

app.post("/upload", upload.any(), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No se recibió ningun archivo" });
  }

  const archivo = req.files[0];
  console.log("archivo recibido: ", archivo);

  res.status(201).json({
    mensaje: "Archivo recibido",
    campo: archivo.fieldname,
    nombreOriginal: archivo.originalname,
    nombreGuardado: archivo.filename,
    tipo: archivo.mimetype,
    tamaño: `${(archivo.size / 1024).toFixed(2)} KB`,
    ruta: archivo.path,
  });
});

app.listen(PORT, () => {
  console.log("=".repeat(55));
  console.log(" EJEMPLO 02 — Multer básico (dest)");
  console.log("=".repeat(55));
  console.log(`\n🚀 Servidor en http://localhost:${PORT}`);
  console.log("\nProbá con Thunder Client/Postman:");
  console.log("  POST http://localhost:" + PORT + "/upload");
  console.log(
    '  Body: form-data → campo "archivo" → seleccionar cualquier archivo',
  );
  console.log(
    "\nLuego revisá la carpeta uploads/ — verás el archivo con nombre aleatorio.",
  );
});
