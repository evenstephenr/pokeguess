import React from 'react'
export const Debug = ({ data }) => (
  <pre>
    {JSON.stringify(data, null, 2)}
  </pre>
)