const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let notes = [];

app.get('/notes', (req, res) => {
  const { query } = req.query;

  if (query) {
    const filteredNotes = notes.filter(note => {
      const textMatch = note.text.toLowerCase().includes(query.toLowerCase());
      const tagsMatch = note.tags && note.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
      return textMatch || tagsMatch;
    });
    return res.json(filteredNotes);
  }

  res.json(notes);
});

app.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now();
  notes.push(newNote);
  res.json(newNote);
});

app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const note = notes.find(n => n.id == id);
  if (note) {
    note.text = text;
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  notes = notes.filter(note => note.id != id);
  res.status(200).json({ message: 'Note deleted' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
