let saludo = "Hola como estás?";
console.log(saludo);

saludo = "Hola alumnos";
console.log(saludo);

/* **************** Mejora 1 ********************/

function saludar() {
  console.log("¡Hola estudiantes!");
}

saludar();
saludar();

/* ******************** Mejora 2 **********************/

function saludar(mensaje) {
  console.log(mensaje);
}

/*
 - La función puede comportarse como una operación 
     que genera valores (como en las operaciones 
     matemáticas y lógicas previas). 

- En el espacio donde se llama a la función se 
  genera un nuevo valor: este valor es el 
  definido por el **RETURN** de la misma. 
  */

function sumarNumeros(num1, num2) {
  return num1 + num2; //retorno
}

//------------------------------------------------------------
//             Ejemplo elección de un personaje
//------------------------------------------------------------

let resultadoDeLaSuma = sumarNumeros(5, 9); //guardo retorno en variab.
console.log(resultadoDeLaSuma); //imprimo el resultado

function elegirPersonaje(opcion) {
  let mensaje;

  switch (opcion) {
    case 1:
      mensaje = "Elegiste al Guerrero ⚔️";
      break;
    case 2:
      mensaje = "Elegiste al Mago 🪄";
      break;
    case 3:
      mensaje = "Elegiste al Arquero 🏹";
      break;
    case 4:
      mensaje = "Elegiste al Hechicero 🔮";
      break;
    default:
      mensaje = "No elegiste un personaje válido 😅";
      break;
  }

  console.log(mensaje);
}

elegirPersonaje(2); // 👉 "Elegiste al Mago 🪄"

//------------------------------------------------------------
//   # Agregando prompt() y alert() a eleccion de personaje
//------------------------------------------------------------

function elegirPersonaje(opcion) {
  let mensaje;

  switch (opcion) {
    case "1":
      mensaje = "Elegiste al Guerrero ⚔️";
      break;
    case "2":
      mensaje = "Elegiste al Mago 🪄";
      break;
    case "3":
      mensaje = "Elegiste al Arquero 🏹";
      break;
    case "4":
      mensaje = "Elegiste al Hechicero 🔮";
      break;
    default:
      mensaje = "No elegiste un personaje válido 😅";
      break;
  }

  alert(mensaje);
}

// Pedir opción al usuario
let opcion = prompt(
  "Elige tu personaje:\n1 - Guerrero ⚔️\n2 - Mago 🪄\n3 - Arquero 🏹\n4 - Hechicero 🔮"
);

// Ejecutar la elección
elegirPersonaje(opcion);

//------------------------------------------------------------
//                       # Scope Global
//------------------------------------------------------------

let resultado = 0;

function sumar(primerNumero, segundoNumero) {
  resultado = primerNumero + segundoNumero;
}

sumar(5, 6);

//Se puede acceder y modificar la variable resultado desde la funcion sumar porque es global

console.log(resultado); //11

/* En este ejemplo puedo hacer referencia a resultado desde cualquier parte de mi programa. */

//------------------------------------------------------------
//                       # Scope local
//------------------------------------------------------------

function sumar(primerNumero, segundoNumero) {
  let resultado = primerNumero + segundoNumero;
}

//No se puede acceder a la variable resultado fuera del bloque
console.log(resultado);

//------------------------------------------------------------
//               # VARIABLES LOCALES Y GLOBALES
//------------------------------------------------------------

let nombre = "John Doe"; // variable global

function saludar() {
  let nombre = "Juan Coder"; // variable local
  console.log(nombre);
}

//Accede a nombre global
console.log(nombre); // → “John Doe”
//Accede a nombre local
saludar(); // → “Juan Coder”**

//------------------------------------------------------------
//                    # Funcion declarada
//------------------------------------------------------------

function saludar() {
  // Tiene nombre: "saludar"
  console.log("Hola");
}

//------------------------------------------------------------
//                    # Funcion Anónima
//------------------------------------------------------------

/* Una función anónima es una función que se define sin 
nombre y se utiliza para ser pasada como parámetro o asignada 
a una variable. En el caso de asignarla a una variable, 
pueden llamar usando el identificador de la variable declarada. */

/* const suma = function (a, b) {
  return a + b;
};

console.log(suma(4, 9)); */

//------------------------------------------------------------
//                    # Funcion Flechas
//------------------------------------------------------------

/* - Sintaxis más concisa utilizando el operador `=>`.
- Retorno implícito cuando la función tiene una sola expresión.
- No tienen su propio contexto `this`, heredan el `this` del entorno donde fueron definidas.
- No tienen su propio objeto `arguments`.
- No se pueden usar como constructores (`no pueden ser invocadas con new`).
- No tienen acceso a los métodos `super` o `new.target`.
- Ideales para funciones anónimas o callbacks. */

/* const suma = (a, b) => {
  return a + b;
};
 */

//Si es una función de una sola línea con retorno podemos evitar escribir el cuerpo.

/* const resta = (a, b) => a - b;
console.log(suma(15, 20));
console.log(resta(20, 5)); */

//------------------------------------------------------------
//                  📌Ejemplo calculo de Iva
//------------------------------------------------------------

// Funciones básicas
const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const calculoIva = (precio) => precio * 0.21;

// Entrada de datos por prompt
let precio1 = parseFloat(prompt("Ingresa el primer precio:"));
let precio2 = parseFloat(prompt("Ingresa el segundo precio:"));

// Verificamos si los valores ingresados son válidos
if (isNaN(precio1) || isNaN(precio2)) {
  alert("Por favor, ingresa valores numéricos válidos.");
} else {
  // Operaciones
  const sumaTotal = suma(precio1, precio2);
  const restaTotal = resta(precio1, precio2);

  const ivaSobreSuma = calculoIva(sumaTotal);
  const ivaSobreResta = calculoIva(restaTotal);

  // Salida formateada
  console.log(
    `Suma: $${sumaTotal.toFixed(2)} - IVA (21%): $${ivaSobreSuma.toFixed(2)}`
  );
  console.log(
    `Resta: $${restaTotal.toFixed(2)} - IVA (21%): $${ivaSobreResta.toFixed(2)}`
  );
}

//------------------------------------------------------------
//                  📌Ejemplo calculo de Iva
//------------------------------------------------------------

let tareas = "";
let numeroTarea = 0;

function mostrarMenuDeOpciones() {
  return prompt(
    "Ingresa una opción para continuar:\n 1. Ingresar una nueva tarea\n 2. Ver mis tareas\n 3. Salir\n"
  );
}

function agregarTarea() {
  let nuevaTarea = prompt("Ingresa una nueva tarea");

  if (nuevaTarea && nuevaTarea.trim() !== "" && isNaN(nuevaTarea)) {
    numeroTarea++;
    tareas += `${numeroTarea}. ${nuevaTarea.trim()}\n`;
    alert("🟢 Tarea agregada con éxito!");
  } else {
    alert("❌ Ingresá una tarea válida (no números ni vacío)");
  }
}

function mostrarTareas() {
  if (numeroTarea === 0) {
    alert("No tienes tareas pendientes");
  } else {
    alert(`Listado de tareas\n${tareas}`);
  }
}

function main() {
  let opcion = mostrarMenuDeOpciones();

  while (opcion !== "3") {
    switch (opcion) {
      case "1":
        agregarTarea();
        break;
      case "2":
        mostrarTareas();
        break;
      default:
        alert("Por favor, ingresa una opcion valida");
        break;
    }

    opcion = mostrarMenuDeOpciones();
  }

  alert("Nos vemos luego");
}

main();
