import { useState } from "react";

// Pantalla de registro de usuarios

function RegisterScreen({ onRegister, onSwitchToLogin }) {

   // Estado para guardar alias y contraseña
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");

  // Maneja el envío del formulario de registro
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!alias || !password) {
      alert("Alias y contraseña son obligatorios");
      return;
    }
    onRegister(alias, password);
    setAlias(""); // limpia campo usuario
    setPassword(""); // limpia campo contraseña
    e.target.reset();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <button type="submit" className="login-button">Crear cuenta</button>
        <p>
          ¿Ya tienes cuenta?{" "}
          <span className="link" onClick={onSwitchToLogin}>
            Inicia sesión aquí
          </span>
        </p>
      </form>
    </div>
  );
}

export default RegisterScreen;
