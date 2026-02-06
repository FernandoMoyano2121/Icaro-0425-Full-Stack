//-------------------------------------------------------------
//                 ESTRUCTURA DEL CICLO FOR
//-------------------------------------------------------------

/* 
for(inicializacion, condicion, actualización){
  ...codigo a ejectuar
}
*/

/* for (let i = 0; i < 10; i++) {
  console.log(i);
}
 */

/*

1) Inicializa i = 0
2) Evalúa condición i < 10
3) Ejecuta console.log(i)
4) Incrementa i
5) Repite pasos 2–4 hasta que la condición sea falsa

👉🏻 En total el bloque se ejecuta 10 veces, imprimiendo los numeros del 0 al 9

-----------------------------------------------------------------------------
| Iteración | Valor de `i` | Acción dentro del bucle | Resultado en consola |
| --------- | ------------ | ----------------------- | -------------------- |
| 1         | 0            | `console.log(0)`        | 0                    |
| 2         | 1            | `console.log(1)`        | 1                    |
| 3         | 2            | `console.log(2)`        | 2                    |
| 4         | 3            | `console.log(3)`        | 3                    |
| 5         | 4            | `console.log(4)`        | 4                    |
| 6         | 5            | `console.log(5)`        | 5                    |
| 7         | 6            | `console.log(6)`        | 6                    |
| 8         | 7            | `console.log(7)`        | 7                    |
| 9         | 8            | `console.log(8)`        | 8                    |
| 10        | 9            | `console.log(9)`        | 9                    |
| 11        | 10           | `i < 10` es **false**   | bucle termina        |
-----------------------------------------------------------------------------

*/

//--------------------------------------------------------------------------
//                       TABLA DE MULTIPLICAR
//--------------------------------------------------------------------------

let numeroIngresado = parseInt(prompt("Por favor ingresa un numero"));

for (let i = 1; i <= 10; i++) {
  let tabla = numeroIngresado * i;
  console.log(`El ${numeroIngresado} X ${i} = ${tabla}`);
}

/*||||||||||||||||||||||||||||||||||| BREAK ||||||||||||||||||||||||||||||| */

for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    console.log("no pouedes continuar");
    break;
  }
  console.log(i);
}

console.log("Estoy fuera del ciclo");

/* |||||||||||||||||||||||||||||||| CONTINUE ||||||||||||||||||||||||||||||||||*/

for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i);
}

//------------------------------------------------------------------------
//                                WHILE
//-------------------------------------------------------------------------

/* 
while(condicion){
continuá ejectuando éste codigo
}
*/

/* while (true) {
  console.log("hole");
} */

/* |||||||||||||||||||| TABLA DE MULTIPLICAR CON WHILE ||||||||||||||||||||||||| */

/*
 isNaN("hola")   // true
isNaN(123)      // false
isNaN("123")    // false  ← se convierte a número
isNaN(true)     // false  ← true → 1
isNaN(undefined)// true//  

El problema de isNaN
Hace coerción de tipos, y eso confunde:

isNaN(" ")   // false  ← se convierte a 0 😐
isNaN(null)  // false  ← null → 0

La manera moderna

Number.isNaN(NaN)        // true
Number.isNaN("hola")    // false
Number.isNaN(undefined) // false

✔️ No convierte tipos
✔️ Solo devuelve true si el valor es realmente NaN
*/

let numeroIngresado1 = parseInt(prompt("Ingresa un numero"));

if (
  isNaN(numeroIngresado1) ||
  numeroIngresado1 === "" ||
  numeroIngresado1 === null
) {
  alert("Ingresa un valor valido");
} else {
  let i = 1;
  while (i <= 10) {
    let tabla = numeroIngresado1 * i;
    console.log(`${numeroIngresado1} * ${i} = ${tabla}`);
    i++;
  }
}

//-----------------------------------------------------------------------------
//                                  DO WHILE
//-----------------------------------------------------------------------------

let i = 0;

do {
  console.log(i);
  i++;
} while (i < 3);

/*
Explicación paso a paso:

1) Se declara i = 0.
2) El bloque dentro de do { ... } se ejecuta una vez antes
   de comprobar la condición.
  → Esto diferencia al do...while del while normal.
3) Luego se evalúa la condición (i < 3).
    Si es true, se repite.
    Si es false, se detiene.
*/

//-------------------------------------------------------------------------------
//                       ADIVINAR EL NUMERO SECRETO
//-------------------------------------------------------------------------------

/*ENTRADA:
 Ingreso de numero por parte del usuario  prompt()

PROCESO:
  - if()
  - for()
  - Variables = numer que elige el usuario
  - Variable =  numero secreto
  - Variable = intentos permitidos

SALIDA
 alert() console.log() 
*/
let numeroSecreto = 8;
let intentosTotales = 3;

for (
  let intentoUsuario = 1;
  intentoUsuario <= intentosTotales;
  intentoUsuario++
) {
  let eleccionUsuario = parseInt(
    prompt("Ingresa un número para intentar adivinar el secreto"),
  );

  // Si el jugador acierta
  if (eleccionUsuario === numeroSecreto) {
    alert("¡Adivinaste!");
    break;
  }

  // Si no acierta
  if (eleccionUsuario !== numeroSecreto) {
    alert("No adivinaste, continúa intentando!");
  }

  // Si llega al último intento sin adivinar
  if (intentoUsuario === intentosTotales) {
    alert(
      `No lograste adivinar el número secreto. El número era ${numeroSecreto}.`,
    );
    break;
  }

  // Mostrar cuántos intentos lleva (solo si no acertó y no se terminó el bucle)
  alert(`Llevas ${intentoUsuario} intento(s).`);
}
