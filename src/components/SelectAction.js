import React from 'react'
import styles from '../styles/selectAction.css'

export default function SelectAction({
  bytelings,
  setBytelings,
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
              onClick={(e) => {
                setBytelings((prev) => {
                  let newState = [...prev]
                  console.log('prev', prev)
                  console.log('player', player)
                  console.log('newState[player]', newState[player])
                  newState[player][
                    activeBytelings[player]
                  ].stats.currentHealth += elem.effects.selfHp
                  newState[player][activeBytelings[player]].stats.currentMana +=
                    elem.effects.selfMana
                  const opponent = player ? 0 : 1
                  newState[opponent][
                    activeBytelings[opponent]
                  ].stats.currentHealth += elem.effects.enemyHp
                  newState[opponent][
                    activeBytelings[opponent]
                  ].stats.currentMana += elem.effects.enemyMana
                  console.log('newState', newState)

                  setPlayerTurn((prevTurn) => {
                    console.log('prevTurn', prevTurn)
                    console.log(
                      'next',
                      turnFlow[prevTurn].next(newState, activeBytelings)
                    )
                    // return prevTurn
                    return turnFlow[prevTurn].next(newState, activeBytelings)
                  })

                  return newState
                })
              }}
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
