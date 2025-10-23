// 1. if: Ejecuta un bloque de código si la condición es verdadera.
if (condicion) {
  // Código a ejecutar si la condición es verdadera
}

// 2. else: Ejecuta un bloque de código si la condición es falsa.
if (condicion) {
  // Código si la condición es verdadera
} else {
  // Código si la condición es falsa
}

// 3. else if: Evalúa múltiples condiciones.
if (condicion1) {
  // Código si condición1 es verdadera
} else if (condicion2) {
  // Código si condición2 es verdadera
} else {
  // Código si ninguna condición es verdadera
}

/* ||||||||||||||||||||| EJEMPLO BASICO |||||||||||||||||||||||||||| */

let edad = 18;

if (edad < 16) {
  // Si tenés menos de 16 años
  console.log("No podés votar");
} else if (edad < 18) {
  // Si tenés más de 16 años pero menos de 18
  console.log("Podés votar pero sos menor de edad");
} else {
  // Si tenés más de 18 años
  console.log("Sos mayor de edad");
}

/* |||||||||||||||||||||| EJEMPLO DE PERMISO ||||||||||||||||||||| */

/*
 Imagina que en un sistema de acceso, un usuario 
 puede ingresar si:
- Está registrado (esRegistrado es true).
- Tiene más de 18 años (edad > 18).

Resultado: Acceso permitido
 */

let esRegistrado = true;
let suEdad = 20;

if (esRegistrado && suEdad > 18) {
  console.log("Acceso permitido");
} else {
  console.log("Acceso denegado");
}

/* ||||||||||||||||||||| EJEMPLO DE LICENCIA |||||||||||||||||||||||| */

let edadConductor = 20;
let tieneLicencia = true;

if (edadConductor > 18 && tieneLicencia) {
  console.log("Puedes conducir");
} else {
  console.log("No puedes conducir");
}

/* ||||||||||||||||||||||| OPERADOR TERNARIO |||||||||||||||||||||||| */

// condicion ? valor_si_es_verdader : valor_si_es_falso

let tuEdad = 18;
let mensaje = tuEdad >= 18 ? "Eres mayor de edad" : "Eres menor de edad";
console.log(mensaje);

/* ||||||||||||||||||||| ANIDACIONES Y COMBINACIONES ||||||||||||||||| */

let usuario = "admin";
let contraseña = "1234";

if (usuario === admin) {
  if (contraseña === "1234") {
    console.log("Acceso concedido");
  } else {
    console.log("Contraseña incorrecta");
  }
} else {
  console.log("usuario no reconocido");
}

/* |||||||||||||||||||||||| COMBINACIONES COMPLEJAS ||||||||||||||||||| */

if (usuario === "admin" && contraseña === "1234") {
  console.log("Acceso concedido");
} else {
  console.log("Acceso denegado");
}

/* ||||||||||||||||||||||||||||| SWITCH CASE |||||||||||||||||||||||| */

switch (expresion) {
  case valor1:
    //codigo a ejecutar si expresion === valor1
    break;
  case valor2:
    //codigo a ejecutar si expresion === valor2
    break;
  case valor3:
    //codigo a ejecutar si expresion === valor3
    break;
  default:
  //codigo que se ejecutara si ningun caso coincide
}

/* ||||||||||||||||||||| EJEMPLO BASICO DE SWITCH ||||||||||||||||||| */

const dia = "Lunes";

switch (dia) {
  case "Lunes":
    console.log("¡Comienza la semana!");
    break;
  case "Miércoles":
    console.log("Mitad de semana.");
    break;
  case "Viernes":
    console.log("¡Fin de semana!");
    break;
  default:
    console.log("Es un día cualquiera.");
}

/* ||||||||||||||||||||| EJEMPLO BASICO DE SWITCH ||||||||||||||||||| */

/* El bloque default garantiza que siempre haya una acción 
   por defecto, incluso si no se cumple ningún caso.
   Es opcional, pero recomendado para evitar resultados
  inesperados */

const color = "Verde";

switch (color) {
  case "Rojo":
    console.log("¡El color es Rojo!");
    break;
  case "Azul":
    console.log("¡El color es Azul!");
    break;
  default:
    console.log("No conozco este color");
}

/* ¿Qué pasa si no usamos break?

Si no usamos break, el programa ejecutará todos los casos 
siguientes después de encontrar una coincidencia.

Salida del ejemplo:
"Dos" y "Tres", porque no hay break después de case 2.
 */

const numero = 2;

switch (numero) {
  case 1:
    console.log("Uno");
  case 2:
    console.log("Dos");
  case 3:
    console.log("Tres");
}

/* Crear un script que valide los datos ingresados por un usuario 
en un formulario.

Instrucciones:
Pide al usuario su edad y si tiene licencia de conducir
Si no tiene edad suficiente (18), indica que no puede conducir.
Valida si puede conducir:
Si tiene más de 18 años y licencia: "Puedes conducir."
De lo contrario: "No puedes conducir."
Tienes un momento para intentarlo…
 */

/* OPCION 1 */

/* let edadPersona = parseInt(prompt("Cual es tu edad?"));
let conlicencia = prompt("¿Tienes Licencia de conducir?(Si/No)").toLowerCase();

if (edad < 18) {
  alert("No puedes conducir");
} else if (edad >= 18 && conlicencia === "si") {
  alert("Puedes conducir");
} else {
  alert("No puedes conducir");
}
 */
/* OPCION 2 */

/* let edadPersona = parseInt(prompt("¿Cuál es tu edad?"));
let conLicencia = prompt("¿Tienes licencia de conducir? (Si/No)").toLowerCase();

if (edadPersona < 18) {
  alert("No puedes conducir");
} else if (conLicencia === "si") {
  alert("Puedes conducir");
} else {
  alert("No puedes conducir");
} */

/* OPCION 3 */

/* let edad = parseInt(prompt("¿Cuál es tu edad?"));
let licencia = prompt("¿Tienes licencia de conducir? (Si/No)").toLowerCase();

let mensaje =
  edad < 18
    ? "No puedes conducir"
    : licencia === "si"
    ? "Puedes conducir"
    : "No puedes conducir";

alert(mensaje);
 */

/* OPCION 4 */

/* let edad = parseInt(prompt("¿Cuál es tu edad?"));
let licencia = prompt("¿Tienes licencia de conducir? (Si/No)").toLowerCase();

switch (true) {
  case edad < 18:
    alert("No puedes conducir");
    break;
  case licencia === "si":
    alert("Puedes conducir");
    break;
  default:
    alert("No puedes conducir");
}
 */

/* OPCION 5 */

/* let edad = parseInt(prompt("¿Cuál es tu edad?"));
let licencia = prompt("¿Tienes licencia de conducir? (Si/No)").toLowerCase();

let puedeConducir = edad >= 18 && licencia === "si";
alert(puedeConducir ? "Puedes conducir" : "No puedes conducir");
 */
