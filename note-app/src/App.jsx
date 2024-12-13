import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteAdd';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [noteText, setNoteText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (noteText) => {
    if (!noteText.trim()) return;
    setNotes([...notes, { text: noteText.trim(), id: Date.now() }]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id, newText) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Note-taking App</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search notes..."
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      />
      <NoteForm addNote={addNote} />
      <NoteList notes={filteredNotes} deleteNote={deleteNote} editNote={editNote} />
    </div>
  );
}

export default App;
