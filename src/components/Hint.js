import React from 'react'
export const Hint = ({
  value,
}) => (
  <input type="text" readOnly disabled value={value} />
)