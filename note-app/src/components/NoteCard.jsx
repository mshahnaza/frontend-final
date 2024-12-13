import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const NoteCard = ({ note, deleteNote, editNote }) => {
    const [newText, setNewText] = useState(note.text);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
  
    const handleEditChange = (e) => {
      setNewText(e.target.value);
    };
  
    const handleSave = () => {
      editNote(note.id, newText);
      setIsEditing(false);
    };
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setNewText(note.text);
      setIsEditing(false);
    };
  
    return (
      <div>
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            width: '200px',
            height: '150px',
            flex: '1 1 300px',
            cursor: 'pointer',
          }}
          onClick={openModal}
        >
          <p
            style={{
              margin: '0',
              fontSize: '20px',
              flex: 1,
              maxHeight: '150px',
              overflowY: 'auto',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              overflow: 'hidden',
              wordWrap: 'break-word',
            }}
          >
            {note.text}
          </p>
  
          <div style={{ marginTop: '10px' }}>
            {note.tags && note.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: '5px',
                  padding: '3px 8px',
                  margin: '2px',
                  fontSize: '14px',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
  
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => deleteNote(note.id)}
              style={{
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                padding: '15px',
                cursor: 'pointer',
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
  
        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: '1000',
            }}
            onClick={closeModal}
          >
            <div
              style={{
                backgroundColor: '#fff',
                padding: '40px',
                borderRadius: '12px',
                maxWidth: '80%',
                minWidth: '600px',
                maxHeight: '80vh',
                overflowY: 'auto',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <textarea
                value={newText}
                onChange={handleEditChange}
                style={{
                  padding: '15px',
                  fontSize: '18px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  width: '100%',
                  minHeight: '250px',
                  maxHeight: '500px',
                  overflowY: 'auto',
                  resize: 'none',
                  fontFamily: 'Arial, sans-serif',
                }}
                disabled={!isEditing}
              />
  
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button
                  onClick={() => {
                    if (isEditing) {
                      handleSave();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                  style={{
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '15px 30px',
                    cursor: 'pointer',
                    marginRight: '15px',
                    fontSize: '16px',
                  }}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={closeModal}
                  style={{
                    backgroundColor: '#f44336',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '15px 30px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default NoteCard;
