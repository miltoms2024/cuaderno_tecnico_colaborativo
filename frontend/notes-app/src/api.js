// Dirección base del backend Flask
export const API_BASE = "http://127.0.0.1:5001";

// Login de usuario o admin
export async function apiLogin(alias, password) {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ alias, password }),
  });
  return res.json();
}

// Registro de nuevo usuario
export async function apiRegister(alias, password) {
  const res = await fetch(`${API_BASE}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ alias, password }),
  });
  return res.json();
}

// Obtener todas las notas
export async function apiGetNotes() {
  const res = await fetch(`${API_BASE}/api/notes`);
  return res.json();
}

// Crear nueva nota
export async function apiCreateNote(note) {
  const res = await fetch(`${API_BASE}/api/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return res.json();
}


// Actualizar una nota existente
export async function apiUpdateNote(noteId, note) {
  const res = await fetch(`${API_BASE}/api/notes/${noteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return res.json();
}

// Eliminar una nota existente
export async function apiDeleteNote(noteId) {
  const res = await fetch(`${API_BASE}/api/notes/${noteId}`, {
    method: "DELETE",
  });
  return res.json();
}
