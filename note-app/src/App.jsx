import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteAdd';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/notes');
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (noteText, tags) => {
    if (!noteText.trim()) return;

    const newNote = {
      text: noteText.trim(),
      tags: tags.split(',').map(tag => tag.trim()),
    };

    try {
      const response = await fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
      const addedNote = await response.json();
      setNotes([...notes, addedNote]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE',
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const editNote = async (id, newText) => {
    const updatedNote = { text: newText };
    try {
      await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });
      setNotes(
        notes.map((note) => (note.id === id ? { ...note, text: newText } : note))
      );
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNotes = notes.filter((note) => {
    const textMatch = note.text.toLowerCase().includes(searchQuery.toLowerCase());
    const tagsMatch = note.tags && Array.isArray(note.tags) && note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return textMatch || tagsMatch;
  });

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
