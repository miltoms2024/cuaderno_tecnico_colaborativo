import React from "react";

// Componente para mostrar una nota en un modal
function NoteModal({ note, onClose }) {
  // Si no hay nota seleccionada, no renderizar nada
  if (!note) return null;

  // Detectar si el archivo es imagen
  const isImage = note?.imageUrl
    ? /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(note.imageUrl)
    : false;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Mostrar título y contenido */}
        <h2>{note.title}</h2>
        <p>{note.content}</p>

        {/* Mostrar fecha */}
        <p><strong>Fecha:</strong> {new Date(note.date).toLocaleString()}</p>

        {/* Mostrar archivo adjunto si existe */}
        {note.imageUrl && (
          <div className="note-attachment">
            {isImage ? (
              <>
                {/* Si es imagen → mostrar miniatura */}
                <img
                  src={note.imageUrl}
                  alt={note.imageUrl.split("/").pop()}
                  style={{ maxWidth: "100%", marginTop: "10px" }}
                />

                {/* Botón de descarga para imagen (abre en nueva pestaña o descarga) */}
                <a
                  href={note.imageUrl}
                  download={note.imageUrl.split("/").pop()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Descargar imagen</button>
                </a>
              </>
            ) : (
              <>
                {/* Si es PDF u otro archivo → mostrar nombre y botón de descarga */}
                <p><strong>Archivo:</strong> {note.imageUrl.split("/").pop()}</p>
                <a
                  href={note.imageUrl}
                  download={note.imageUrl.split("/").pop()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Descargar archivo</button>
                </a>
              </>
            )}
          </div>
        )}

        {/* Botón para cerrar el modal */}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default NoteModal;
