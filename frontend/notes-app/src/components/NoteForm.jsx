// Importamos hooks de React
import { useState, useEffect, useRef } from "react";

// Componente del formulario de notas
function NoteForm({ onSave, editingNote, role, onCancelEdit }) {
  // Estado local de la nota
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    imageUrl: null,
  });

  // Referencia al input de archivo para poder limpiarlo
  const fileInputRef = useRef(null);

  // Cargar datos si estamos editando una nota
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

  // Manejar cambios en campos de texto
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

  // Cancelar archivo adjunto
  const handleCancelFile = () => {
    setNoteData({ ...noteData, imageUrl: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Cancelar edición de nota
  const handleCancelEdit = () => {
    setNoteData({ title: "", content: "", imageUrl: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
    onCancelEdit(); // avisa al padre que ya no hay edición
  };

  // Guardar nota
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
      {/* Campo título */}
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={noteData.title}
        onChange={handleChange}
      />

      {/* Campo contenido */}
      <textarea
        name="content"
        placeholder="Contenido"
        value={noteData.content}
        onChange={handleChange}
      />
      {/* Campo archivo */}
      <div className="file-input-group">
        <input
          type="file"
          accept=".pdf,.txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* Botón cancelar archivo → solo aparece si hay adjunto */}
        {noteData.imageUrl && (
          <button type="button" onClick={handleCancelFile} className="cancel-file-btn">
            Cancelar archivo
          </button>
        )}
      </div>


      {/* Botones de acción */}
      {role !== "user" && (
        <>
          <button type="submit">
            {editingNote ? "Actualizar nota" : "Guardar y Publicar"}
          </button>

          {/* Solo aparece si estamos editando */}
          {editingNote && (
            <button
              type="button"
              className="cancel-edit"
              onClick={handleCancelEdit}
            >
              Cancelar edición
            </button>
          )}
        </>
      )}
    </form>
  );
}

export default NoteForm;
