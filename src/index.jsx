
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";


// Adicione o link do Bootstrap via CDN no cabeçalho HTML
const link = document.createElement("link");
link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css";
link.rel = "stylesheet";
document.head.appendChild(link);

document.body.classList.add("bg-secondary");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);