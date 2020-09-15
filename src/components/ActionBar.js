import React from 'react';

export const ActionBar = ({
  children,
}) => (
  <div
    style={{
      paddingBottom: '1em',
      paddingTop: '1em',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {children}
  </div>
);
