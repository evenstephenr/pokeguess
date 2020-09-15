import React from 'react';

export const Hint = ({
  value,
}) => (
  <input 
    type="text" 
    readOnly 
    disabled 
    value={value}
    style={{
      padding: '1em',
      background: 'unset',
      border: 'unset',
      fontFamily: "'Press Start 2P', 'Helvetica Neue', 'Roboto', sans-serif",
      letterSpacing: '1em',
      textAlign: 'center'
    }}
  />
);
