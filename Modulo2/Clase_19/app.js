/* EVENTO CLICK */

/* const button = document.getElementById("button");

button.addEventListener("click", function (evento) {
  console.log(evento);
});
 */

/* EVENTO INPUT */

const input = document.getElementById("input");

input.addEventListener("input", (evento) => {
  console.log(`Informacion ingresada por el usuario: ${evento.target.value}`);
});

/* EVENTO MOUSEOVER */

function mouseOver() {
  console.log("Por encima de button");
}

const button = document.getElementById("button");
button.addEventListener("mouseover", mouseOver);

button.removeEventListener("mouseover", mouseOver);

/* PREVENTDEFAULT() */
const enlace = document.getElementById("enlace");
enlace.addEventListener("click", (evento) => {
  evento.preventDefault();
  console.log("Enlace clickeado, navegación detenida");
});

/* ELEMENTO HTML Y SU PROPIEDAD STYLE  */

const contenedor = document.getElementById("contenedor");

contenedor.addEventListener("mouseover", () => {
  contenedor.style.backgroundColor = "blue";
});

contenedor.addEventListener("mouseout", () => {
  contenedor.style.backgroundColor = "white";
});

/* ************************** ECCOMERCE *********************************/

const botones = document.querySelectorAll(".btnComprar");
const lista = document.getElementById("listaCompras");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const nombreProducto = boton.dataset.nombre; //Obtener el nombre del prod.

    //Crea un nuevo item de lista
    const item = document.createElement("li");

    //Le asigna al item el nombre del producto
    item.textContent = nombreProducto;

    //inserta el item dentro de la lista
    lista.appendChild(item);
  });
});
