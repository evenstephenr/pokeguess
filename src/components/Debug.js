import React from 'react';

export const Debug = ({ data }) => {
  const debugModeEnabled = process.env.REACT_APP_USER_ENV === 'debug'
  if (!debugModeEnabled) return null;
  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};
