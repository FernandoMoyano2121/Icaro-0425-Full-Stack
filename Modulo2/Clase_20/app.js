/* TIPOS DE NODO */
/* const parrafo = document.querySelector("p");
console.log(parrafo.nodeType); //1
console.log(parrafo.firstChild.nodeType); */

/* CREAR E INSERTAR ELEMENTOS  */

/* const contenedor = document.querySelector(".contenedor");*/

/* const parrafo = document.createElement("p");
parrafo.textContent = "Hola Queridos alumnos";

contenedor.appendChild(parrafo); */

/* --------- */

/* const nuevoElemento = document.createElement("h2");
nuevoElemento.textContent = "éste es un nuevo titulo";
titulo.insertBefore(nuevoElemento, titulo.firstChild);
titulo.appendChild(nuevoElemento); */

/* CLONNODE */
/* 
const contenedor = document.getElementById("contenedor");
const parrafo = document.getElementById("parrafo");

const parrafoDuplicado = parrafo.cloneNode(true);
contenedor.appendChild(parrafoDuplicado);

contenedor.removeChild(parrafoDuplicado);
 */

//-------------------------------------------------------------
//                    LISTA DE TAREAS
// ------------------------------------------------------------

const input = document.getElementById("nuevaTarea");
const boton = document.getElementById("agregarBtn");
const lista = document.getElementById("listaTareas");

//boton a la escucha del evento
boton.addEventListener("click", () => {
  //obteniendo el valor ingresado por el usuario
  const texto = input.value;

  //creando el elemnto item de lista
  const li = document.createElement("li");
  //Agregando el texto del usuario al item
  li.textContent = texto;

  const btnEliminar = document.createElement("button"); //creación
  btnEliminar.textContent = "Eliminar"; //Agregando texto "eliminar"

  //Adjuntando escucha de evento al boton
  btnEliminar.addEventListener("click", () => li.remove());

  //insertando boton dentro de el item de lista
  li.appendChild(btnEliminar);

  //insertando item de lista dentro de la lista
  lista.appendChild(li);

  //Borramos el valor del input
  input.value = "";
});
