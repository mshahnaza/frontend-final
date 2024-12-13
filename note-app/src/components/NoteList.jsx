import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({ notes, deleteNote }) => {
  return (
    <div>
      {notes.map((note, index) => (
        <NoteCard key={index} note={note} index={index} onDelete={deleteNote} />
      ))}
    </div>
  );
};

export default NoteList;
