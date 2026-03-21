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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname); //ej .jpg
    const nombreBase = path.basename(file.originalname, extension); //foto
    const nombreFinal = `${Date.now()}-${nombreBase}${extension}`;
    cb(null, nombreFinal);
  },
});

const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ["image/png", "image/jpeg"];

  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Tipo de archivo no peremitido ${file.mimetype} Solo se aceptan imagenes JPEG y PNG`,
      ),
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

app.post("/upload", upload.single("imagen"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se recibio ningun archivo" });
  }

  res.status(201).json({
    mensaje: "Imagen recibida",
    nombreOriginal: req.file.originalname,
    nombreGuardado: req.file.filename,
    tipo: req.file.mimetype,
    tamaño: `${(req.file.size / 1024).toFixed(2)} KB`,
  });
});

app.listen(PORT, () => {
  console.log("=".repeat(55));
  console.log(" EJEMPLO 03 — Multer con diskStorage + filtros");
  console.log("=".repeat(55));
  console.log(`\n🚀 Servidor en http://localhost:${PORT}`);
  console.log(
    '\nProbá con Thunder Client — POST /upload (form-data, campo "imagen"):',
  );
  console.log("  Caso 1: imagen .jpg o .png ≤ 2MB → 201 ✅");
  console.log("  Caso 2: archivo .pdf o .txt      → 400 (tipo no permitido)");
  console.log("  Caso 3: imagen > 2MB             → 400 (tamaño excedido)");
  console.log(
    "\nFijate en la carpeta uploads/ — el nombre ahora incluye extensión.",
  );
});
