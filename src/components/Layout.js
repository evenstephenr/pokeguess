import React from 'react';

export const Centered = ({ children }) => (
  <div
    style={{
      width: '100%',
      maxWidth: '350px',
      margin: 'auto',
      textAlign: 'center'
    }}
  >
    {children}
  </div>
);
