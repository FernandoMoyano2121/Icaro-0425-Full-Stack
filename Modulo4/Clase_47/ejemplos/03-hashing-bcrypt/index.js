import bcrypt from "bcrypt";

//const SALT_ROUNDS = 10;

async function demoHash() {
  const passwordOriginal = "miPassword123";

  const hash1 = await bcrypt.hash(passwordOriginal, 10);
  const hash2 = await bcrypt.hash(passwordOriginal, 12);

  console.log("Password Original:", passwordOriginal);
  console.log("HASH1: ", hash1);
  console.log("HASH2: ", hash2);
}

async function demoCompare() {
  const passwordOriginal = "miPassword123";
  const hashGuardadoEnDB = await bcrypt.hash(passwordOriginal, 10);

  console.log("Hash guardado en BD:", hashGuardadoEnDB);

  /* Caso correcto  */
  const passwordCorrecta = "miPassword123";
  const coincide = await bcrypt.compare(passwordCorrecta, hashGuardadoEnDB);
  console.log(coincide);

  /* Contraseña no coincide */
  const passwordIncorrecta = "otraPassword";
  const noCoincide = await bcrypt.compare(passwordIncorrecta, hashGuardadoEnDB);
  console.log(noCoincide);
}

async function main() {
  try {
    await demoHash();
    await demoCompare();
  } catch (error) {
    console.error(error);
  }
}

main();
