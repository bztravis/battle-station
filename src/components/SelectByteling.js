import React from 'react'
import styles from '../styles/selectByteling.css'

export default function SelectByteling({ bytelings, player }) {
  console.log('player', player)
  return (
    <div className="selectContainer">
      <h2>Select a Byteling</h2>
      <div className="optionContainer">
        {bytelings[player].map((elem) => (
          <div
            className="selectOption"
            style={{ background: `url(${elem.imageUrl})` }}
          >
            {elem.name}
          </div>
        ))}
      </div>
    </div>
  )
}
