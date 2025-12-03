import { TaskManager } from "./TaskManager.js";
import { TaskUi } from "./TaskUi.js";

//INICIO DE MI APLICACION

const manejador = new TaskManager();
const ui = new TaskUi(manejador);

ui.render();
