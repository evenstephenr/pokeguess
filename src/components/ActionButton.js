import React from 'react'
export const ActionButton = ({
  action,
  label,
}) => (
  <button onClick={() => action()}>{label}</button>
)