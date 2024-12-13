import React from 'react';

const NoteCard = ({ note, index, onDelete }) => {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <p style={{ margin: '0', fontSize: '16px', flex: 1 }}>{note}</p>
      <button
        onClick={() => onDelete(index)}
        style={{
          backgroundColor: '#f44336',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '5px 10px',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default NoteCard;
