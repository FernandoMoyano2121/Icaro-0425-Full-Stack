function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

/* const persona1 = new Persona("Fernando", 33); */

/* ------------------CLASE PERSONA----------------------- */

class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    console.log(`hola ${this.nombre}`);
  }
}

/* const persona1 = new Persona("Fernando", 33);
const persona2 = new Persona("Luciano", 25); */

/* ------------------CLASE AUTO----------------------- */

class Auto {
  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
  }
}

const miAuto = new Auto("Toyota", "Corolla");
console.log(miAuto.marca);

/* -----------------CLASE ANIMAL----------------------- */

class Animal {
  constructor(nombre, tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
  }

  describir() {
    console.log(`soy un ${this.tipo} y me llamo ${this.nombre} `);
  }
}

//Instanciar los objetos
/* const perro = new Animal("Rex", "perro"); */

//ejecucion del metodo
/* perro.describir(); */

/* ********************** HERNCIA **************************/

class Animal {
  constructor(nombre, tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
  }

  hablar() {
    console.log(`soy un ${this.tipo} y hago un sonido`);
  }
}

class Perro extends Animal {
  hablar() {
    console.log(`${this.nombre} ladra`);
  }
}

const miPerro = new Perro("Rex", "perro");
miPerro.hablar();

/* ********************** SUPER() **************************/

class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    console.log(`hola soy ${this.nombre}`);
  }
}

class Estudiante extends Persona {
  constructor(nombre, edad, curso) {
    super(nombre, edad);
    this.curso = curso;
  }

  mostrarCurso() {
    console.log(`${this.nombre} pertenece al curso de  ${this.curso}`);
  }
}

const estudiante = new Estudiante("Luciano", 25, "Full Stack");
estudiante.saludar();
estudiante.mostrarCurso();

/* ********************** GET () - SET() **************************/

class Persona {
  constructor(nombre) {
    this._nombre = nombre;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nuevoNombre) {
    this._nombre = nuevoNombre;
  }
}

const persona1 = new Persona("Fernando");

//set
persona1.nombre = "Luis";
//get
console.log(persona1.nombre);

/************** MODIFICADORES DE ACCESO ********************/

class CuentaBancaria {
  #saldo;

  constructor(saldoInicial) {
    this.#saldo = saldoInicial;
  }

  depositarDinero(monto) {
    this.#saldo += monto;
    console.log(`Nuevo saldo = ${this.#saldo}`);
  }
}

const miCuentaBancaria = new CuentaBancaria(1500);

//console.log(miCuentaBancaria.#saldo);
miCuentaBancaria.depositarDinero(500);
