/************  DESESTRUCTURACION ARRAYS ****************/

import { sumar, restar } from "./operacion.js";

/* const numeros = [1, 2, 3, 4, 5, 6];
 */
/*
 const a = numeros[0];
const b = numeros[1];

*/
/* console.log(a); //1
console.log(b); //2

const [a, b] = numeros;
console.log(a, b);
 */
/************  DESESTRUCTURACION OBJETOS ****************/

/* const persona = { nombre: "Fernando", edad: 33 };

const edadDeLaPersona = persona.edad;

const { nombre, edad } = persona;
console.log(nombre, edad); //Fernando 33
 */

/************  DESESTRUCTURACION OMISION ****************/

/* const numeros = [1, 2, 3, 4, 5, 6];

const [primero, segundo, , cuarto] = numeros;

console.log(primero);
console.log(segundo);
console.log(cuarto); */

/*****************  OPERADOR SPREAD ... *******************/

/* const a = [1, 2];
const b = [3, 4];

//Combinacion de ambos arrays
const combinado = [...a, ...b];
console.log(combinado); */

/*****************  OPERADOR SPREAD OBJETOS ***************/

/* const persona = { nombre: "Fede", edad: 30 };

//Copiar y extender objetos
const personaActualizada = { ...persona, pais: "Argentina" };
console.log(personaActualizada); */

/*****************  TEMPLATE STRINGS  ***************/

/* let nombre = "Federico";
console.log("Hola " + nombre + "!");
console.log(`Hola ${nombre}!`); */

/*******************  POLIMORFISMO  *****************/

/* class Figura {
  area() {
    console.log("Calculo del area");
  }
}

class Rectangulo extends Figura {
  constructor(base, altura) {
    super();
    this.base = base;
    this.altura = altura;
  }

  area() {
    return this.base * this.altura;
  }
}

class Circulo extends Figura {
  constructor(radio) {
    super();
    this.radio = radio;
  }

  area() {
    return Math.PI * this.radio ** 2;
  }
}
 */

/*
const rectangulo = new Rectangulo(300, 200);
console.log(rectangulo.area());

const circulo = new Circulo(300);
console.log(circulo.area());
*/

/* const figuras = [new Rectangulo(100, 200), new Circulo(3)];
figuras.forEach((figura) => console.log(figura.area())); */

/* console.log(sumar(5, 9)); */

class Vehiculo {
  constructor(marca, modelo, año) {
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
  }

  detalles() {
    console.log(`Vehiculo: ${this.marca} ${this.modelo} ${this.año}`);
  }
}

class Auto extends Vehiculo {
  constructor(marca, modelo, año, puertas) {
    super(marca, modelo, año);
    this.puertas = puertas;
  }

  detalles() {
    console.log(
      `Vehiculo: ${this.marca} ${this.modelo} ${this.año} Puertas: ${this.puertas}`
    );
  }
}

class Moto extends Vehiculo {
  constructor(marca, modelo, año, cilindrada) {
    super(marca, modelo, año);
    this.cilindrada = cilindrada;
  }

  detalles() {
    console.log(
      `Vehiculo: ${this.marca} ${this.modelo} ${this.año} Cilindrada: ${this.cilindrada}`
    );
  }
}

class Camion extends Vehiculo {
  constructor(marca, modelo, año, capacidad) {
    super(marca, modelo, año);
    this.capacidad = capacidad;
  }

  detalles() {
    console.log(
      `Vehiculo: ${this.marca} ${this.modelo} ${this.año} Capacidad: ${this.capacidad} toneladas`
    );
  }

  cargar() {
    console.log(
      `El camion ${this.marca} está cargando ${this.capacidad} toneladas`
    );
  }
}

//Instancias
const auto1 = new Auto("Toyota", "Corolla", 2022, 4);
const moto1 = new Moto("Yamaha", "R1", 2024, 1000);
const camion1 = new Camion("Mercedes", "Actros", 2020, 18);

const vehiculos = [auto1, moto1, camion1];

//Imprimir mensaje de detalles observando el polimorfismo
vehiculos.forEach((vehiculo) => {
  vehiculo.detalles();
});

camion1.cargar();
