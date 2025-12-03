export class TaskUi {
  constructor(manager) {
    this.manager = manager;
    this.tareaEditando = null;

    this.nombre = document.getElementById("nombreTarea");
    this.prioridad = document.getElementById("prioridadTarea");
    this.vencimiento = document.getElementById("fechaVencimiento");
    this.btnAgregar = document.getElementById("agregarTarea");
    this.listado = document.getElementById("listadoTareas");
    this.pendientes = document.getElementById("tareasPendientes");

    this.btnAgregar.addEventListener("click", () => this.handleAgregar());
  }

  handleAgregar() {
    const nombre = this.nombre.value.trim();
    const prioridad = this.prioridad.value;
    const vencimiento = this.vencimiento.value;

    if (!nombre || !prioridad || !vencimiento) {
      alert("Tienes que rellenar todos los campos");
      return;
    }

    if (this.tareaEditando) {
      this.manager.editar(
        this.tareaEditando.id,
        nombre,
        prioridad,
        vencimiento
      );
      this.btnAgregar.textContent = "Agregar";
      this.tareaEditando = null;
    } else {
      this.manager.agregar(nombre, prioridad, vencimiento);
    }
    this.limpiarFormulario();
    this.render();
  }

  cargarParaEdicion(tarea) {
    this.nombre.value = tarea.nombre;
    this.prioridad.value = tarea.prioridad;
    this.vencimiento.value = tarea.vencimiento;

    this.tareaEditando = tarea;
    this.btnAgregar.textContent = "Guardar Cambios";
  }

  render() {
    this.listado.innerHTML = "";
    this.manager.tareas.forEach((tarea) => {
      //item de lista
      const item = document.createElement("li");
      item.className =
        "list-group-item d-flex justify-content-around align-items-center";

      //Checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = tarea.completada;
      checkbox.addEventListener("change", () => {
        this.manager.marcarCompletada(tarea.id);
        this.render();
      });

      //Informacion de la tarea
      const info = document.createElement("span");
      info.innerHTML = ` <strong>${tarea.nombre}</strong> |
        Prioridad: ${tarea.prioridad} |
        <strong>Vence: ${tarea.vencimiento}</strong>`;

      //botones editar/eliminar
      const btnEditar = this.crearBoton("Editar", "btn btn-success");
      const btnEliminar = this.crearBoton("Eliminar", "btn btn-danger");

      btnEditar.addEventListener("click", () => this.cargarParaEdicion(tarea));

      btnEliminar.addEventListener("click", () => {
        this.manager.eliminar(tarea.id);
        this.render();
      });

      //Agregando nodo al DOM
      item.append(checkbox, info, btnEditar, btnEliminar);
      this.listado.append(item);
    });

    //Contador de tareas pendientes
    this.pendientes.textContent = `Tareas pendientes: ${this.manager.obtenerPendientes()}`;
  }

  crearBoton(texto, clases) {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.className = clases;
    return btn;
  }

  // Limpieza tras agregar/editar
  limpiarFormulario() {
    this.nombre.value = "";
    this.prioridad.value = "Media";
    this.vencimiento.value = "";
  }
}
