import React from 'react';

export const ActionButton = ({
  action,
  label,
}) => (
  <button 
    onClick={() => action()}
    style={{
      background: 'unset',
      padding: '1em 2em',
      display: 'inline-block',
      fontFamily: "'Press Start 2P', 'Helvetica Neue', 'Roboto', sans-serif",
      border: '2px solid #000',
      borderRadius: '4px',
      outline: 'none',
      cursor: 'pointer',
      marginBottom: '1em'
    }}
  >
    {label}
  </button>
);
