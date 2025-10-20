/* |||||||||||||||||||||||||TIPOS DE DATOS |||||||||||||||||||*/
//number   = 5
//string   = "Fernando"
//boolean  = true/false
//undefind = undefined
//null     = null

/*|||||||||||||||||||||| DECLARACION DE VARIABLES|||||||||||| */

/* let numero;
numero = 5; */

/* |||||||||||||||||||||||||| number |||||||||||||||||||||||*/
/* let numero = 5; */

/*|||||||||||||||||||||||| string |||||||||||||||||||||||||||*/
/* let nombreCompleto = "Fernando Moyano";

/* ||||||||||||||||||||||||||| camel Case ||||||||||||||||||| */
/*nombreCompleto = "Luciano Fried"; */

/* |||||||||||||||||||||| boolean |||||||||||||||||||||||||| */
/* let apagado = falso; */

/*|||||||||||||||||||||||||| undefined ||||||||||||||||||||||||*/
/* let indefinido = undefined; */

/*|||||||||||||||||||||||||| null |||||||||||||||||||||||||||| */
/* let nulo = null; */

/*|||||||||||||||||||||||||||| Array |||||||||||||||||||||||||| */
//let miArray = ["fernnado", 9, true];

/* declaracion de variables con var (deprecado) */
/* var nombre = 9; */

/* declaracion con const */
/* const edad = 39;
edad = 90; */

/*|||||||||||||||||||||||||||||||| OPERADORES ARITMÉTICOS
- "+" 
- "-" 
- "*" 
- "/" 
*/

/* OPERADORES LÓGICOS ||||||||||||||||||||||||||
- && (y)
- || (o)
- !
*/

/*
 OPERADORES DE ASIGNACION |||||||||||||||||||||||
  "="
  "+="
*/

//comentario de linea
/* Comentario multilinea
comentario
multilinea
*/

/* |||||||||||||| OPERADOR ASIGNACION ADICION ||||||||||*/
let numero = 10;
//numero = 10 + 5;
/* numero += 5;
numero -= 5;
numero *= 5;
numero /= 7; */

/*|||||||||||||||||| FUNCIONES INTEGRADAS ||||||||||||||||||*/

alert("Hola Alumnos");
console.log("hola alumnos");
let esMayor = confirm("Eres mayor de edad?");
console.log(esMayor);

parseFloat();
parseInt();

let edad = parseInt(prompt("Ingresa tu edad"));
console.log(typeof edad);

/* |||||||||||||||||||||||||||||||||||||||||||||||||| */

let numero1 = parseInt(prompt("Ingresa el primer numero"));
let numero2 = parseInt(prompt("Ingresa el segundo numero"));

let suma = numero1 + numero2;
let resta = numero1 - numero2;
let multiplicacion = numero1 * numero2;
let division = numero1 / numero2;

console.log("El resultado de la suma es: " + suma);

console.log();

/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

let temperatura = parseInt(prompt("Ingresa la temperatura en celsius"));

let temperaturaEnFahrenheit = temperatura / 2; /* Formula correspondiente */
console.log(temperaturaEnFahrenheit);
alert(temperaturaEnFahrenheit);
