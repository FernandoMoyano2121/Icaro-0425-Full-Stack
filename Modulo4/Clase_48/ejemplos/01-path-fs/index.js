import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function demoPath() {
  console.log("------------DEMO PATH-----------------");

  const rutaJoin = path.join("uploads", "usuarios", "avatar.png");
  console.log("path join: ", rutaJoin);

  const rutaResolve = path.resolve("uploads", "avatar.png");
  console.log("path resolve:", rutaResolve);

  console.log("__dirname: ", __dirname);
}

async function demoEscritura() {
  const carpetaSandbox = path.join(__dirname, "sandbox");
  await fs.mkdir(carpetaSandbox, { recursive: true });
  console.log("Carpeta creada: ", carpetaSandbox);

  const rutaArchivo = path.join(carpetaSandbox, "notas.txt");
  const contenido = `Notas de clase 48 \n Celina, Luciano, Guillermo`;

  await fs.writeFile(rutaArchivo, contenido, "utf-8");
}

async function demoLectura() {
  const rutaArchivo = path.join(__dirname, "sandbox", "notas.txt");
  const contenido = await fs.readFile(rutaArchivo, "utf-8");

  console.log("Contenido Leido: ");
  console.log(contenido);
}

async function main() {
  try {
    demoPath();
    await demoEscritura();
    await demoLectura();
  } catch (error) {
    console.error(error.message);
  }
}

main();
