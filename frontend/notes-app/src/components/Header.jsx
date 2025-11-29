// frontend/notes-app/src/components/Header.jsx

import React from 'react';
// import './Header.css'; // Si usas un archivo CSS separado, déjalo.

function Header({ onSearch, onLogout }) {
  
  return (
    <header className="app-header">
      <div className="header-title">
        <h1>Cuaderno Técnico Colaborativo</h1>
      </div>
      
      // Dentro del return, reemplaza <div className="header-controls">...</div>
<div className="header-controls nav-controls"> 
    {/* Campo de búsqueda */}
    <input 
        type="text"
        placeholder="Buscar notas por título o contenido..."
        onChange={(e) => onSearch(e.target.value)} // <--- CONEXIÓN DE BÚSQUEDA
        className="search-input"
    />
    
    {/* Botón de Cerrar Sesión */}
    <button onClick={onLogout} className="logout-button"> {/* <--- CONEXIÓN DE LOGOUT */}
        Cerrar Sesión
    </button>
</div>
    </header>
  );
}

export default Header;