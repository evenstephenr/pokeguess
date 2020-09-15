import React from 'react';

export const Sprite = ({
  src,
  alt = '???'
}) => (
  <img 
    src={src} 
    alt={alt} 
    style={{
      maxWidth: '150px',
      height: '150px',
      margin: 'auto',
    }}
  />
);
