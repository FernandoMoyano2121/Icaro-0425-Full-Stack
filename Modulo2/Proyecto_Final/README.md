# Resumen de cada función y método

---

### Task (constructor)

- Esta función cumple el rol de:
  Crear una nueva tarea con sus propiedades básicas
  (id, nombre, prioridad, vencimiento, completada).
  Estandarizar la estructura de cada tarea en el sistema.
  Facilitar el manejo de datos dentro del TaskManager.

### TaskManager.agregar(nombre, prioridad, vencimiento)

- Esta función cumple el rol de:
  Crear una nueva instancia de Task.
  Asignarle un ID único incremental.
  Guardar esa nueva tarea dentro del arreglo interno tareas.

### TaskManager.editar(id, nombre, prioridad, vencimiento)

- Esta función cumple el rol de:
  Buscar una tarea por su ID.
  Actualizar sus campos con los valores que recibe.
  Mantener la integridad del listado sin reemplazar objetos completos.

### TaskManager.eliminar(id)

- Esta función cumple el rol de:
  Filtrar la lista de tareas eliminando solo la que coincide con el ID.
  Mantener limpia la lista sin mutar otras tareas.

### TaskManager.marcarCompletada(id)

- Esta función cumple el rol de:
  Buscar la tarea correspondiente.
  Alternar (true/false) su estado de completada.
  Permitir marcar o desmarcar tareas sin borrarlas.

### TaskManager.getPendientes()

- Esta función cumple el rol de:
  Contar cuántas tareas NO están completadas.
  Facilitar la actualización del indicador de “tareas pendientes”.

### TaskUI.handleAgregar()

- Esta función cumple el rol de:
  Leer los datos ingresados en el formulario.
  Validar que no haya campos vacíos.
  Decidir si debe agregar o editar según si tareaEditando está activa.
  Reiniciar el formulario después de la acción.
  Llamar a render() para actualizar la vista.

### TaskUI.cargarParaEdicion(tarea)

- Esta función cumple el rol de:
  Pre-cargar los datos de la tarea en los inputs del formulario.
  Activar el modo edición guardando la referencia en tareaEditando.
  Cambiar el texto del botón “Agregar” por “Guardar Cambios”.

### TaskUI.render()

- Esta función cumple el rol de:
  Vaciar el listado visible de tareas.
  Volver a generarlo completamente según el estado actual de TaskManager.
  Construir cada elemento con checkbox, información y botones.
  Asignar eventos a Editar, Eliminar y Completar.
  Actualizar el contador de tareas pendientes.

### TaskUI.crearBoton(texto, clases)

- Esta función cumple el rol de:
  Crear un botón preconfigurado con texto y clases CSS.
  Evitar duplicar código repetido en la creación de botones.
  Devolver un elemento listo para agregar al DOM.

### TaskUI.limpiarFormulario()

- Esta función cumple el rol de:
  Resetear los inputs después de agregar/editar.
  Volver a estado “Agregar” por defecto.
  Evitar que queden datos antiguos cargados accidentalmente.
