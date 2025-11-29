import React, { useState } from "react";

// Pantalla de inicio de sesión

function LoginScreen({ onLogin, onSwitchToRegister }) {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");

  
  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(alias, password);
  };

  return (
    <div className="login-grid">
      {/* Columna de la imagen */}
      <div className="login-image-column">
        <div className="image-placeholder">
          <img src="/ascensor.jpg" alt="componente ascensor"/>
        </div>
      </div>

      {/* Columna del formulario */}
      <div className="login-form-column">
        <h2>Iniciar sesión</h2>
        <p>Bienvenido al Caderno Tecnico       </p>
        <p>Accede con tu usuario y contraseña</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Usuario:</label>
          <input
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            required
          />

          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">Entrar</button>
        </form>

        <div className="register-text">
          <span>¿No tienes cuenta? </span>
          <span className="register-link" onClick={onSwitchToRegister}>
            Registrarse
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
