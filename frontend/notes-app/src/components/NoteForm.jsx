import { useState, useEffect } from "react";
// Componente para el formulario de notas

function NoteForm({ onSave, editingNote, role }) {
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    imageUrl: null,
  });


  // Si hay una nota en edición, cargar sus datos
  useEffect(() => {
    if (editingNote) {
      setNoteData({
        title: editingNote.title || "",
        content: editingNote.content || "",
        imageUrl: editingNote.imageUrl || null,
      });
    } else {
      setNoteData({ title: "", content: "", imageUrl: null });
    }
  }, [editingNote]);

   // Manejar cambios en los campos de texto

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData({ ...noteData, [name]: value });
  };


  // Manejar subida de archivo

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.ok) {
        setNoteData({ ...noteData, imageUrl: data.url });
      } else {
        alert(data.error || "Error al subir imagen");
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
    }
  };


   // Manejar envío del formulario

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteData.title || !noteData.content) {
      alert("Título y contenido son obligatorios");
      return;
    }
    onSave(noteData);
    setNoteData({ title: "", content: "", imageUrl: null });
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={noteData.title}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="Contenido"
        value={noteData.content}
        onChange={handleChange}
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      {role !== "user" && (
        <button type="submit">
          {editingNote ? "Actualizar nota" : "Guardar y Publicar"}
        </button>
      )}
      
    </form>
  );
}

export default NoteForm;
