import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ App.jsx está en src/
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
