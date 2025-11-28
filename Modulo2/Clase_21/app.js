//--------------------------------------------------------------
//                   DOCUMENTACION CON JSDOC
//--------------------------------------------------------------

/**
 *
 * @param {string} nombre
 * @param {function} funcionCallback
 */

function saludar(nombre, funcionCallback) {
  console.log(`Hola ${nombre}`);
  funcionCallback();
}

/**
 * Funcion de despedida
 */
function despedir() {
  console.log("Chau");
}

saludar(5, despedir);

//----------------------------------------------------------------
//               CALL STACK Y SETTIMEOUT
//----------------------------------------------------------------

console.log("Inicio");

setTimeout(() => {
  console.log("Fin");
}, 3000);

console.log("Desarrollo...");

//----------------------------------------------------------------
//                              PROMISE
//----------------------------------------------------------------

const promesa = new Promise((resolve, reject) => {
  let exito = false;

  if (exito) {
    resolve("Promesa resuelta");
  } else {
    reject("Promesa rechazada");
  }
});

promesa
  .then((resultado) => console.log(resultado))
  .catch((error) => console.log(error));

//----------------------------------------------------------------
//                           ASYNC AWAIT
//----------------------------------------------------------------

async function obtenerDatos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Te presento los datos: ....");
    }, 3000);
  });
}

async function ejecutar() {
  const resultado = await obtenerDatos();
  console.log(resultado);
}

ejecutar();

//----------------------------------------------------------------
//                             FETCH()
//----------------------------------------------------------------

document.getElementById("buscarBtn").addEventListener("click", buscarPokemon);

async function obtenerPokemons(nombre) {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

  if (!respuesta.ok) {
    throw new Error("Pokemon no encontrado");
  }
  const data = await respuesta.json();
  return data;
}

async function buscarPokemon() {
  const nombre = document.getElementById("nombrePokemon").value.toLowerCase();
  const resultado = document.getElementById("resultado");

  resultado.textContent = "Buscando...";

  try {
    const pokemon = await obtenerPokemons(nombre);

    resultado.innerHTML = `
    <img src="${pokemon.sprites.back_default}"></img>
    <h2>Nombre:  ${pokemon.name}</h2>
    <p>Peso :${pokemon.weight} kg</p>
    `;
  } catch (error) {
    resultado.textContent = `Error: ${error}`;
  }
}
