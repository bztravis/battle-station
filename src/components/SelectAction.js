import React from 'react'
import styles from '../styles/selectAction.css'

export default function SelectAction({
  bytelings,
  player,
  activeBytelings,
  setActiveBytelings,
  setPlayerTurn,
  turnFlow,
}) {
  console.log('player', player)
  return (
    <div className="actionContainer">
      <h2>Select an Action</h2>
      <div className="optionContainer">
        {bytelings[player][activeBytelings[player]].attacks.map(
          (elem, index) => (
            <button
              className="actionOption"
              style={{ background: `url(${elem.backgroundUrl})` }}
            >
              <h3>{elem.name}</h3>
              <p>{elem.description}</p>
            </button>
          )
        )}
      </div>
    </div>
  )
}
