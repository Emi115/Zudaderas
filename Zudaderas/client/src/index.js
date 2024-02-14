// En el archivo index.js
import React from "react";
import ReactDOM from "react-dom";
import CrearSudadera from "./components/CrearSudaderas/CrearSudadera.js"; // Importa el componente App

ReactDOM.render(
    <React.StrictMode>
            <h1>Hola</h1>
        <CrearSudadera /> {/* Renderiza el componente App */}


    </React.StrictMode>,
    document.getElementById("root")
);
