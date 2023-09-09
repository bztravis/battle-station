import React from 'react'
import { useState } from 'react'
import styles from '../styles/PreGameScreen.css'

export default function PreGameScreen({ players, setPlayers }) {
  return (
    <div className="container">
      <h1>Players, ready your drives!</h1>
      <div className="playerContainer">
        <div className={`playerTag`}>
          <p>USB 1:</p>
          <p
            className="playerName"
            style={{
              background: `${players.player1?.accentColor ?? '#808080'}`,
            }}
          >
            {players.player1?.name ?? 'Waiting for second USB...'}
          </p>
        </div>
        <div className={`playerTag`}>
          <p>USB 2:</p>
          <p
            className="playerName"
            style={{
              background: `${players.player2?.accentColor ?? '#808080'}`,
            }}
          >
            {players.player2?.name ?? 'Waiting for second USB...'}
          </p>
        </div>
      </div>
      <button
        disabled={!players.player1 || !players.player2}
        className="startButton"
      >
        Start
      </button>
    </div>
  )
}
