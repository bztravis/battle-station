import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../styles/gameView.css'

export default function GameView({ drives, setInGame }) {
  const [playerTurn, setPlayerTurn] = useState(1)
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
        </div>
        <div className="byteling">
          <div className="platform"></div>
        </div>
      </div>
    </div>
  )
}
