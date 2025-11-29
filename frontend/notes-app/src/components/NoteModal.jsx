function NoteModal({ note, onClose }) {
  if (!note) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p><strong>Fecha:</strong> {new Date(note.date).toLocaleString()}</p>

        {/* Mostrar imagen si existe */}
        {note.imageUrl && (
          <div className="note-image">
            <img
              src={note.imageUrl}
              alt="Imagen adjunta"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
            <a href={note.imageUrl} download>
              <button>Descargar imagen</button>
            </a>
          </div>
        )}

         <button onClick={onClose}>Cerrar</button>

         
      </div>
    </div>
  );
}

export default NoteModal;
