console.log(persona);
console.log(persona.nombre);
console.log(persona["nombre"]);

persona.nombre = "Luis";
console.log(persona.nombre);

persona.altura = 1.7;
console.log(persona);

persona.saludar();

/* ------------------------------------------------------------ */

const persona = {
  nombre: "Fernando",
  edad: 33,
  nacionalidad: "Argentina",
  saludar: function () {
    console.log(`Hola mi nombre es ${this.nombre}`);
  },
};

for (let clave in persona) {
  console.log(`${clave}: ${persona[clave]}`);
}

console.log(Object.keys(persona));
console.log(Object.values(persona));

/* const task = {
  id: 1,
  descripcion: "Lavar la ropa",
  vencimiento: "2025-10-10",
  estado: "en progreso",
};
const task1 = {
  id: 1,
  descripcion: "Lavar la ropa",
  vencimiento: "2025-10-10",
  estado: "en progreso",
}; */

//-----------------------------------------------------------
//                  FUNCION CONSTRUCTORA
//------------------------------------------------------------

function Task(id, descripcion, vencimiento, estado) {
  this.id = id;
  this.descripcion = descripcion;
  this.vencimiento = vencimiento;
  this.estado = estado;
}

/* const task1 = new Task(1, "estudiar", "2025-10-10", "en progreso");
console.log(task1); */

//----------------------------------------------------------
//    EJEMPLO MINI APLICACION TAREAS POO SINTAXIS CLASE
//---------------------------------------------------------

class Task {
  constructor(id, descripcion, vencimiento, estado) {
    this.id = id;
    this.descripcion = descripcion;
    this.vencimiento = vencimiento;
    this.estado = estado;
  }
}

class TaskList {
  constructor() {
    this.tasks = [];
  }

  addTask(newTask) {
    this.tasks.push(newTask);
  }

  deleteTask(id) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      alert("tarea eliminada");
    } else {
      alert("No existe la tarea que quieres eliminar");
    }
  }

  showTasks() {
    if (this.tasks.length === 0) {
      alert("Aún no tienes tareas en la lista");
      return;
    }

    this.tasks.forEach((task) => {
      console.log(`============ MI LISTADO ===========`);
      console.log(`${task.id}`);
      console.log(`${task.descripcion}`);
      console.log(`${task.vencimiento}`);
      console.log(`${task.estado}`);
    });
  }
}

const miListado = new TaskList();
const task1 = new Task(1, "comprar pan", "2025-09-10", "en progreso");
miListado.addTask(task1);
miListado.showTasks();
/* miListado.deleteTask(1); */

//------------------------------------------------------------
//Ejemplo de almacenamiento en array Tasks
//------------------------------------------------------------

/* [
    {
     id: 1,
    descripcion: "Lavar la ropa",
    vencimiento: "2025-10-10",
    estado: "en progreso"
    },
    {
    id: 2,
    descripcion: "Programar",
    vencimiento: "2025-10-10",
    estado: "en progreso"
    },
]
 */

/* const task1 = new Task(1, "estudiar", "2025-10-10", "en progreso");
console.log(task1); */
