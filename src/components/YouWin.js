import React from 'react'

export default function YouWin({ username }) {
  return (
    <div
      style={{
        zIndex: 5,
        background: '#00000080',
        width: '100dvw',
        height: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ color: 'white' }}>
        {username.toUpperCase()} WON THE MATCH!
      </h1>
    </div>
  )
}
