/* ************************** EVENTO CLICK *******************************/

const button1 = document.getElementById("button");

button1.addEventListener("click", function (evento) {
  console.log(evento);
});

/* ************************** EVENTO INPUT ******************************/

const input = document.getElementById("input");

input.addEventListener("input", (evento) => {
  console.log(`Informacion ingresada por el usuario: ${evento.target.value}`);
});

/* ************************ EVENTO MOUSEOVER ****************************/

function mouseOver() {
  console.log("Por encima de button");
}

const button = document.getElementById("button");
button.addEventListener("mouseover", mouseOver);

//button.removeEventListener("mouseover", mouseOver);

/* ************************ PREVENTDEFAULT() ****************************/

const formulario = document.getElementById("miFormulario");

formulario.addEventListener("submit", function (event) {
  // 🔴 Evita que el navegador recargue la página
  event.preventDefault();

  // Obtener los valores del formulario
  const datos = new FormData(formulario);
  const nombre = datos.get("nombre");
  const email = datos.get("email");

  // Mostrar resultado en pantalla
  document.getElementById("resultado").textContent =
    `Nombre: ${nombre} - Email: ${email}`;

  console.log("Formulario procesado sin recargar");
});

/* **************** ELEMENTO HTML Y SU PROPIEDAD STYLE  *****************/

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
    //Obtener el nombre del prod.
    const nombreProducto = boton.dataset.nombre;

    //Crea un nuevo item de lista
    const item = document.createElement("li");

    //Le asigna al item el nombre del producto
    item.textContent = nombreProducto;

    //inserta el item dentro de la lista
    lista.appendChild(item);
  });
});
