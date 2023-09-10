import React from 'react'
import styles from '../styles/selectByteling.css'

export default function SelectByteling({
  bytelings,
  player,
  activeBytelings,
  setActiveBytelings,
  setPlayerTurn,
  turnFlow,
}) {
  console.log('player', player)
  return (
    <div className="selectContainer">
      <h2>Select a Byteling</h2>
      <div className="optionContainer">
        {bytelings[player].map((elem, index) => (
          <button
            className="selectOption"
            style={{ background: `url(${elem.imageUrl})` }}
            disabled={elem.stats.currentHealth <= 0}
            onClick={(e) => {
              setActiveBytelings((prev) => {
                const newState = [...prev]
                newState[player] = index
                console.log('newState', newState)
                setPlayerTurn((prev) => {
                  console.log('prev', prev)
                  console.log(turnFlow[prev].next(bytelings, activeBytelings))
                  return turnFlow[prev].next(bytelings, activeBytelings)
                })
                return newState
              })
            }}
          >
            {elem.name}
          </button>
        ))}
      </div>
    </div>
  )
}
