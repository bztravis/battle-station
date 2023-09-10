import React from 'react'
import { useState, useEffect } from 'react'
import SelectByteling from './SelectByteling'
import styles from '../styles/gameView.css'

export default function GameView({ drives, setInGame }) {
  const [playerTurn, setPlayerTurn] = useState('selectP0')
  const [bytelings, setBytelings] = useState([
    drives[0]?.bytelings,
    drives[1]?.bytelings,
  ])
  const [activeBytelings, setActiveBytelings] = useState([0, 0])
  console.log('drives', drives)

  useEffect(() => {
    setBytelings([drives[0]?.bytelings, drives[1]?.bytelings])
  }, [drives])

  const turnFlow = {
    start: {
      next: (bytelings) => 'actionP0',
    },
    chooseP0: {
      next: (bytelings) => {
        if (
          bytelings[0].filter((elem) => elem.stats.currentHealth > 0).length ===
          0
        )
          return 'winP1'
        else return activeBytelings[1] ? 'chooseP1' : 'actionP0'
      },
    },
    chooseP1: {
      next: (bytelings) => {
        if (
          bytelings[1].filter((elem) => elem.stats.currentHealth > 0).length ===
          0
        )
          return 'winP0'
        else return activeBytelings[0] ? 'chooseP0' : 'actionP1'
      },
    },
    actionP0: {
      next: (bytelings) => {
        return bytelings[activeBytelings[1]].stats.currentHealth <= 0
          ? 'chooseP1'
          : 'actionP1'
      },
    },
    actionP1: {
      next: (bytelings) => {
        return bytelings[activeBytelings[0]].stats.currentHealth <= 0
          ? 'chooseP0'
          : 'actionP0'
      },
    },
  }

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
          <div className="platform">
            <div
              className="sprite"
              style={{
                backgroundImage: `url(${
                  bytelings[activeBytelings?.[0]]?.imageUrl
                })`,
              }}
            ></div>
          </div>
          <div className=""></div>
        </div>
        <div className="byteling">
          <div className="platform">
            <div
              className="sprite"
              style={{
                backgroundImage: `url(${
                  bytelings[activeBytelings?.[1]]?.imageUrl
                })`,
              }}
            ></div>
          </div>
          <div className=""></div>
        </div>
      </div>
      {playerTurn === 'selectP0' && (
        <SelectByteling
          bytelings={bytelings}
          player={parseInt(playerTurn.slice(-1))}
        />
      )}
    </div>
  )
}
