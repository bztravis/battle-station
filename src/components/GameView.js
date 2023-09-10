import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../styles/gameView.css'

export default function GameView({ drives, setInGame }) {
  const [playerTurn, setPlayerTurn] = useState(0)
  const [activeBytelings, setActiveBytelings] = useState([null, null])
  const [bytelings, setBytelings] = useState([
    drives[0]?.bytelings,
    drives[1]?.bytelings,
  ])

  const turnFlow = {
    start: {
      next: (bytelings) => 'actionP1',
    },
    chooseP1: {
      next: (bytelings) => {
        if (
          bytelings[0].filter((elem) => elem.stats.currentHealth > 0).length ===
          0
        )
          return 'winP2'
        else return activeBytelings[1] ? 'chooseP2' : 'actionP1'
      },
    },
    chooseP2: {
      next: (bytelings) => {
        if (
          bytelings[1].filter((elem) => elem.stats.currentHealth > 0).length ===
          0
        )
          return 'winP1'
        else return activeBytelings[0] ? 'chooseP1' : 'actionP2'
      },
    },
    actionP1: {
      next: (bytelings) => {
        return activeBytelings[1].stats.currentHealth <= 0
          ? 'chooseP2'
          : 'actionP2'
      },
    },
    actionP2: {
      next: (bytelings) => {
        return activeBytelings[0].stats.currentHealth <= 0
          ? 'chooseP1'
          : 'actionP1'
      },
    },
  }

  // useEffect(() => {}, [playerTurn])

  console.log('drives', drives)
  return (
    <div className="container">
      <div className="infoContainer">
        <div className={`playerTag`}>
          <p>USB 1:</p>
          <p
            className="playerName"
            style={{
              background: `${drives[0]?.profile.accentColor ?? '#808080'}`,
            }}
          >
            {drives[0]?.profile.name ?? 'Waiting for USB...'}
          </p>
        </div>
        <div className={`playerTag`}>
          <p>USB 2:</p>
          <p
            className="playerName"
            style={{
              background: `${drives[1]?.profile.accentColor ?? '#808080'}`,
            }}
          >
            {drives[1]?.profile.name ?? 'Waiting for USB...'}
          </p>
        </div>
      </div>
      <div className="bytelingContainer">
        <div className="byteling">
          <div className="platform"></div>
          <div className=""></div>
        </div>
        <div className="byteling">
          <div className="platform"></div>
          <div className=""></div>
        </div>
      </div>
    </div>
  )
}
