import React from 'react'
export const Sprite = ({
  src,
  alt = '???'
}) => {
  return (
    <>
      {/* TODO: should we use .scss for styles? */}
      <img src={src} alt={alt} style={{ height: '240px', width: '240px' }} />
    </>
  )
}