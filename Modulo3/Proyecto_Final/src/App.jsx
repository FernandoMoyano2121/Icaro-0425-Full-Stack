import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { TaskDetail } from "./pages/TaskDetail/TaskDetail";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar siempre visible */}

      <Navbar />

      {/* Definición de rutas */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/task/:id" element={<TaskDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
