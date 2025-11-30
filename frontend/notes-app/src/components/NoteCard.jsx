import React from "react";

// Componente para mostrar una nota individual

function NoteCard({ note, onDelete, onView, onEdit }) {
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

            {/*Mostrar archivo adjunto si existe*/}
      {note?.imageUrl && (
        <div className="file-attachment-section">
          {/\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(note.imageUrl) ? (
            <img
              src={note.imageUrl}
              alt={note.imageUrl.split("/").pop()}
              className="file-thumbnail"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          ) : (
            <p className="file-name-info">
              {note.imageUrl.split("/").pop()} {/* muestra nombre o tipo */}
            </p>
          )}
        </div>
      )}


      <div className="note-actions">
        <button onClick={() => onView(note)} className="view-button">Ver</button>
        {note?.imageUrl && (
          <a
            href={note.imageUrl}
            download={note.imageUrl.split("/").pop()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="download-button">Descargar</button>
          </a>
        )}
        <button onClick={() => onEdit(note)}>Editar</button>
        <button onClick={() => onDelete(note)}>Eliminar</button>
      </div>
    </div>
  );
}

export default NoteCard;
