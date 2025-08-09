import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Lobby from "./Lobby";

function App() {
  return <h1 className="text-3xl font-bold underline">Hello, Aux Wars!</h1>;
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Lobby />
  </React.StrictMode>
);