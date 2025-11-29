import React from "react";
import NoteCard from "./NoteCard";

// Lista de notas, muestra cada nota con sus acciones

function NoteList({ notes, onDelete, onView, onEdit, onDownload, role }) {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          onView={onView}
          onEdit={onEdit}
          onDownload={onDownload}
          role={role}
        />
      ))}
    </div>
  );
}

export default NoteList;
