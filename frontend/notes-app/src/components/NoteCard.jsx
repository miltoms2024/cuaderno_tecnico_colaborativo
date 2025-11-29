import React from "react";

// Componente para mostrar una nota individual

function NoteCard({ note, onDelete, onView, onEdit, onDownload }) {
   // Si no hay nota disponible
  if (!note) {
    return <div className="note-card">Nota no disponible</div>;
  }

  return (
    <div className="note-card">
      <h3 className="note-title">{note?.title || "Sin título"}</h3>
      <p>{note?.content || "Sin contenido"}</p>
      <p>
        <small>
          {note?.date ? new Date(note.date).toLocaleString() : "Fecha no disponible"}
        </small>
      </p>

      {note?.imageUrl && (
        <div className="file-attachment-section">
          <img
            src={note.imageUrl}
            alt="Imagen adjunta"
            className="file-thumbnail"
          />
          <p className="file-name-info">Archivo adjunto</p>
        </div>
      )}

      <div className="note-actions">
        <button onClick={() => onView(note)} className="view-button">Ver</button>
        {note?.imageUrl && (
          <button onClick={() => onDownload(note)} className="download-button">Descargar</button>
        )}
        <button onClick={() => onEdit(note)}>Editar</button>
        <button onClick={() => onDelete(note)}>Eliminar</button>
      </div>
    </div>
  );
}

export default NoteCard;
