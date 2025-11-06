/* const miArray = [1, 2, 3, 4, 5, 6];
const letras = ["a", "b", "c", "d"]; */

// console.log(miArray);
/* console.log(letras);
console.log(letras.length); */

//acceso a valores\elementos
/* console.log(letras[0]);
console.log(letras[2]); */

/* for (let i = 0; i < nombres.length; i++) {
  console.log(nombres[i]);
  }
  */

//Recorriendo array con bucle for

/* for (let index = 0; index < nombres.length; index++) {
  const element = nombres[index];
  console.log(element);
  }
  */

//Recorriendo array con bucle for

/* Recorriendo array con  for of  */
//const nombres = ["Fernando", "Luciano", "Celina", "Victoria"];

/* for (let nombre of nombres) {
  console.log(nombre);
}
 */

//----------------------------------------------------------
//                          POP()
//----------------------------------------------------------

/* const nombreEliminado1 = nombres.pop();
console.log(nombres);
console.log(nombreEliminado1);
 */

//----------------------------------------------------------
//                          SHIFT()
//----------------------------------------------------------

/* let nombreEliminado2 = nombres.shift();
console.log(nombres);
console.log(nombreEliminado2); */

//----------------------------------------------------------
//                          PUSH()
//----------------------------------------------------------

/* const nuevaLongitud1 = nombres.push("Emiliano");
console.log(nombres);
console.log(nuevaLongitud1);
 */

//--------------------------------------------------------
//                        UNSHIFT()
//--------------------------------------------------------

/* const nuevaLongitud2 = nombres.unshift("Guillermo");
console.log(nombres);
console.log(nuevaLongitud2); */

//------------------------------------------------------
//                       SPLICE()
//------------------------------------------------------

/* let elementosRemovidos = nombres.splice(1, 2);
console.log(nombres);
console.log(elementosRemovidos); */

//---------------------------------------------------------
//                         JOIN()
//--------------------------------------------------------

//console.log(nombres.join("**"));
/* const nombresConSeparador = nombres.join("--");
console.log(nombresConSeparador); */

//---------------------------------------------------------
//                         CONCAT()
//---------------------------------------------------------

/* const listadoDeNombres1 = ["Pedro", "Martin"];
const listadoDeNombres2 = ["Juan", "Fernando"];

console.log(listadoDeNombres1.concat(listadoDeNombres2));

let listadoCompleto = listadoDeNombres1.concat(listadoDeNombres2);
console.log(listadoCompleto); */

//------------------------------------------------------------
//              FUNCIONES DE ORDEN SUPERIOR
//------------------------------------------------------------

/* function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

function calcular(a, b, fn) {
  return fn(a, b);
}

console.log(sumar(5, 8));
console.log(calcular(5, 8, sumar)); */

const nombres = ["Fernando", "Luciano", "Celina", "Victoria"];

//-------------------------------------------------------
//                          FOREACH
//--------------------------------------------------------

/* nombres.forEach((elemento) => {
  console.log(elemento);
}); */

//-------------------------------------------------------
//        CONSTRUCCION RUDIMENTARIA DE FOR EACH
//-------------------------------------------------------

/* function porCadaUno(array, funcionInferior) {
  for (let elemento of array) {
    funcionInferior(elemento);
  }
}

porCadaUno(nombres, console.log); */

//----------------------------------------------------------
//                        FIND()
//----------------------------------------------------------

/* const misNumeros = [1, 2, 3, 4, 5, 6, 7, 8];
 */
/* const numeroMayorACinco = misNumeros.find((numero) => {
  return numero > 5;
}); */

/* const numeroMayorACinco = misNumeros.find((numero) => numero > 5);
console.log(numeroMayorACinco);
 */

//------------------------------------------------------------
//                        FILTER()
//------------------------------------------------------------

/* const numerosMayoresACinco = misNumeros.filter((numero) => numero > 5);
console.log(numerosMayoresACinco); */

//------------------------------------------------------------
//                           MAP()
//------------------------------------------------------------

/* const numerosMultiplicados = misNumeros.map((numero) => numero * 2);
console.log(numerosMultiplicados);
 */

const listaDeParticipantes = [];
let totalDeParticipantes = 5;

const main = () => {
  do {
    //1. PEDIR UN NOMBRE
    const nombre = pedirNombre("Ingresa un participante en la lista");

    //2. CHEQUEAR QUE NO SEA NULL
    if (nombre === null) {
      alert("Entrada Cancelada");
      break;
    }
    //3.AGREGAR PARTICIPANTE A LA LISTA
    agregarParticipante(nombre);

    //4.RESTAR PARTICIPANTES DE LA LISTA TOTAL
    totalDeParticipantes--;

    //5.MOSTRAR EL LISTADO COMPLETO
    const listado = mostrarParticipantes(listaDeParticipantes);
    console.log(listado);
  } while (totalDeParticipantes > 0);
};

const pedirNombre = (mensaje) => {
  return prompt(mensaje);
};

const agregarParticipante = (nombre) => {
  listaDeParticipantes.push(nombre);
};

const mostrarParticipantes = (listado) => {
  return listado.join(", ");
};

main();
