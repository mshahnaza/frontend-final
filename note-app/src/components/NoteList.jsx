import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({ notes, deleteNote, editNote }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          editNote={editNote}
        />
      ))}
    </div>
  );
};

export default NoteList;
