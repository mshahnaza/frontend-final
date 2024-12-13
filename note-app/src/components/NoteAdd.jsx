import React, { useState } from 'react';

const NoteForm = ({ addNote }) => {
  const [noteText, setNoteText] = useState('');

  const handleChange = (e) => {
    setNoteText(e.target.value);
  };

  const handleAddNote = () => {
    addNote(noteText);
    setNoteText('');
  };

  return (
    <div>
      <textarea
        value={noteText}
        onChange={handleChange}
        placeholder="Type your note here..."
        style={{
          width: '100%',
          height: '80px',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      />
      <button
        onClick={handleAddNote}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          width: '100%',
          marginBottom: '30px',
        }}
      >
        Add Note
      </button>
    </div>
  );
};

export default NoteForm;