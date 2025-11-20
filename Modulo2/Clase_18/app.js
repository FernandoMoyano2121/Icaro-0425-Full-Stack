/* console.log(document.body); */

//-------------------------------------------------
//seleccionar un elemento HTML mediante getElementById
//--------------------------------------------------

/* const contenedor = document.getElementById("contenedor");
console.log(contenedor); */

//-----------------------------------------------------
//seleccionar un elemento HTML mediante querySelector
//-------------------------------------------------------

const contenedor = document.querySelector("#contenedor");
console.log(contenedor);

const parrafo = document.querySelector(".parrafo");
console.log(parrafo);

//-----------------------------------------------------------
//seleccionar un elemento HTML mediante getElementsByClassName
//------------------------------------------------------------

/* const parrafo = document.getElementsByClassName("parrafo");
console.log(parrafo); */

//-----------------------------------------------------------
//seleccionar un elemento HTML mediante querySelectorAll
//------------------------------------------------------------

const parrafos = document.querySelectorAll(".parrafo");
console.log(parrafos);

for (let parrafo of parrafos) {
  console.log(parrafo);
}

//-----------------------------------------------------------
//seleccionar un elemento HTML mediante querySelectorAll
//------------------------------------------------------------

/* const parrafos = document.getElementsByTagName("p");
console.log(parrafos); */

//-----------------------------------------------------------
// Acceder al nodo de contenido
//------------------------------------------------------------

const titulo = document.getElementById("titulo");
console.log(titulo.textContent);

//-----------------------------------------------------------
// Modificando el contenido del nodo
//------------------------------------------------------------

titulo.textContent = "Hola Como están?";
titulo.innerHTML = "<strong> Hola Como están?</strong>";

//-----------------------------------------------------------
// Modificando el valor del atributo
//------------------------------------------------------------

const inputPassword = document.getElementById("inputPassword");
inputPassword.setAttribute("type", "text");
