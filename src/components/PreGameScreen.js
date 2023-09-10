import React from 'react'
import { useState } from 'react'
import styles from '../styles/PreGameScreen.css'

export default function PreGameScreen({ drives, setInGame }) {
  if (drives.length === 2)
    setTimeout(() => {
      setInGame(true)
    }, 3000)
  return (
    <div className={`container`}>
      <h1>Players, ready your drives!</h1>
      <div className="playerContainer">
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
      <button
        className={`startButton ${!drives[0] || !drives[1] ? 'disabled' : ''}`}
        onClick={() => {
          console.log('bruh')
          // setInGame(true)
        }}
      >
        {drives.length === 2 ? 'Starting...' : 'Start'}
      </button>
      {drives[0] && drives[1] && <div className="flare"></div>}
      {drives[0] && (
        <div
          className="leftReadyBackground"
          style={{ background: `${drives[0]?.profile.accentColor}` }}
        ></div>
      )}
      {drives[1] && (
        <div
          className="rightReadyBackground"
          style={{ background: `${drives[1]?.profile.accentColor}` }}
        ></div>
      )}
    </div>
  )
}
