import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import NoteModal from "./components/NoteModal";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";

// Componente principal de la aplicación
function App() {
  // Estados principales
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  // Cargar notas al iniciar sesión
  useEffect(() => {
    if (isLoggedIn) {
      fetch("http://localhost:5000/api/notes")
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) setNotes(data.notes);
        });
    }
  }, [isLoggedIn]);

  // Cancelar edición
  
const handleCancelEdit = () => {
setEditingNote(null);
};


  // Guardar o actualizar nota
  const handleSave = async (note) => {
    if (editingNote) {
      // Actualizar nota existente
      const response = await fetch(`http://localhost:5000/api/notes/${editingNote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...note, author: currentUser }),
      });
      const data = await response.json();
      if (data.ok) {
        setNotes((prev) =>
          prev.map((n) => (n.id === editingNote.id ? data.note : n))
        );
        setEditingNote(null);
      }
    } else {
      // Crear nueva nota
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...note, author: currentUser }),
      });
      const data = await response.json();
      if (data.ok) {
        setNotes((prev) => [...prev, data.note]);
      }
    }
  };

  // Eliminar nota
  const handleDelete = async (note) => {
    await fetch(`http://localhost:5000/api/notes/${note.id}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
  };

  // Manejar login
  const handleLogin = async (alias, password) => {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alias, password }),
    });
    const data = await response.json();
    if (data.ok) {
      setIsLoggedIn(true);
      setCurrentUser(alias);
    } else {
      alert(data.error || "Error en login");
    }
  };

  // Manejar registro
  const handleRegister = async (alias, password) => {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alias, password }),
    });
    const data = await response.json();
    if (data.ok) {
      setShowRegister(false);
      alert("Usuario registrado correctamente");
    } else {
      alert(data.error || "Error en registro");
    }
  };

  // Función auxiliar para búsqueda
  const safeIncludes = (value, term) =>
    String(value || "").toLowerCase().includes(String(term || "").toLowerCase());

  // Filtrar notas según búsqueda
  const filteredNotes = notes.filter(
    (note) => safeIncludes(note.title, searchTerm) || safeIncludes(note.content, searchTerm)
  );

  return (
    <div className="app-container">
      {/* Pantallas de login y registro */}
      {!isLoggedIn ? (
        showRegister ? (
          <RegisterScreen
            onRegister={handleRegister}
            onSwitchToLogin={() => setShowRegister(false)}
          />
        ) : (
          <LoginScreen
            onLogin={handleLogin}
            onSwitchToRegister={() => setShowRegister(true)}
          />
        )
      ) : (
        <div className="main-content">
          {/* Encabezado principal */}
          <div className="app-header">
            <h1>Cuaderno Técnico Colaborativo</h1>
            <div className="nav-controls">
              <span>Bienvenido {currentUser}</span>
              <input
                type="text"
                placeholder="Buscar nota..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentUser("");
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>

          {/* Formulario para crear/editar notas */}
          <NoteForm onSave={handleSave} editingNote={editingNote}
          onCancelEdit={handleCancelEdit} // 👈 aquí conectamos el botón Cancelar edición
          />   
          {/* Lista de notas */}
          <NoteList
            notes={filteredNotes}
            onDelete={handleDelete}
            onView={(note) => setSelectedNote(note)}
            onEdit={(note) => setEditingNote(note)}
            onDownload={(note) => {
              if (note?.imageUrl) {
                const link = document.createElement("a");
                link.href = note.imageUrl;
                link.download = `nota-${note.id}.png`;
                link.click();
              } else {
                alert("Esta nota no tiene imagen para descargar");
              }
            }}
          />

          {/* Modal para ver nota seleccionada */}
          {selectedNote && (
            <NoteModal
              note={selectedNote}
              onClose={() => setSelectedNote(null)}
              onDownload={(note) => {
                if (note?.imageUrl) {
                  const link = document.createElement("a");
                  link.href = note.imageUrl;
                  link.download = `nota-${note.id}.png`;
                  link.click();
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
