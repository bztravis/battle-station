import React from 'react'
import { useState, useEffect } from 'react'
import SelectAction from './SelectAction'
import SelectByteling from './SelectByteling'
import { ProgressDisplay } from './ProgressDisplay'
import styles from '../styles/gameView.css'

export default function GameView({ drives, setInGame }) {
  const [playerTurn, setPlayerTurn] = useState('chooseP0')
  const [bytelings, setBytelings] = useState([
    drives[0]?.bytelings,
    drives[1]?.bytelings,
  ])
  const [activeBytelings, setActiveBytelings] = useState([null, null])
  // console.log('bytelings', bytelings)

  const turnFlow = {
    start: {
      next: (bytelings, activeBytelings) => 'actionP0',
    },
    chooseP0: {
      next: (bytelings, activeBytelings) => {
        if (
          bytelings[0].filter((elem) => elem.stats.currentHealth > 0).length ===
          0
        )
          return 'winP1'
        else
          return bytelings[1][activeBytelings?.[1]]?.stats.currentHealth > 0
            ? 'actionP0'
            : 'chooseP1'
      },
    },
    chooseP1: {
      next: (bytelings, activeBytelings) => {
        if (
          bytelings[1].filter((elem) => elem.stats.currentHealth > 0).length ===
          0
        )
          return 'winP0'
        else
          return bytelings[0][activeBytelings?.[0]]?.stats.currentHealth > 0
            ? 'actionP1'
            : 'chooseP0'
      },
    },
    actionP0: {
      next: (bytelings, activeBytelings) => {
        console.log(
          'bytelings',
          bytelings,
          bytelings[0][activeBytelings[0]].stats.currentHealth,
          bytelings[1][activeBytelings[1]].stats.currentHealth
        )
        return bytelings[1][activeBytelings[1]].stats.currentHealth > 0
          ? 'actionP1'
          : 'chooseP1'
      },
    },
    actionP1: {
      next: (bytelings, activeBytelings) => {
        console.log(
          'bytelings',
          bytelings,
          bytelings[0][activeBytelings[0]].stats.currentHealth,
          bytelings[0][activeBytelings[0]].stats.currentHealth
        )
        return bytelings[0][activeBytelings[0]].stats.currentHealth > 0
          ? 'actionP0'
          : 'chooseP0'
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
        <div
          className="byteling"
          // style={{ scale: parseInt(playerTurn.slice(-1)) === 0 ? 1.1 : 1 }}
        >
          <div className="platform">
            <div
              className="sprite"
              style={{
                backgroundImage: `url(${
                  bytelings[0][activeBytelings[0]]?.imageUrl
                })`,
              }}
            ></div>
          </div>
          <div className="">
            <h2>{bytelings[0][activeBytelings[0]]?.name}</h2>
            <ProgressDisplay
              statName="Health"
              current={bytelings[0][activeBytelings[0]]?.stats.currentHealth}
              max={bytelings[0][activeBytelings[0]]?.stats.maxHealth}
              barColor="#dc2626"
            />
            <ProgressDisplay
              statName="Mana"
              current={bytelings[0][activeBytelings[0]]?.stats.currentMana}
              max={bytelings[0][activeBytelings[0]]?.stats.maxMana}
              barColor="#dc2626"
            />
          </div>
        </div>
        <div className="byteling">
          <div className="platform">
            <div
              className="sprite"
              style={{
                backgroundImage: `url(${
                  bytelings[1][activeBytelings[1]]?.imageUrl
                })`,
              }}
            ></div>
          </div>
          <div className="">
            <h2>{bytelings[1][activeBytelings[1]]?.name}</h2>
            <ProgressDisplay
              statName="Health"
              current={bytelings[1][activeBytelings[1]]?.stats.currentHealth}
              max={bytelings[1][activeBytelings[1]]?.stats.maxHealth}
              barColor="#dc2626"
            />
            <ProgressDisplay
              statName="Mana"
              current={bytelings[1][activeBytelings[1]]?.stats.currentMana}
              max={bytelings[1][activeBytelings[1]]?.stats.maxMana}
              barColor="#dc2626"
            />
          </div>
        </div>
      </div>
      {playerTurn.slice(0, 6) === 'choose' && (
        <SelectByteling
          bytelings={bytelings}
          activeBytelings={activeBytelings}
          player={parseInt(playerTurn.slice(-1))}
          setActiveBytelings={setActiveBytelings}
          setPlayerTurn={setPlayerTurn}
          turnFlow={turnFlow}
        />
      )}
      {playerTurn.slice(0, 6) === 'action' && (
        <SelectAction
          bytelings={bytelings}
          setBytelings={setBytelings}
          player={parseInt(playerTurn.slice(-1))}
          activeBytelings={activeBytelings}
          setActiveBytelings={setActiveBytelings}
          setPlayerTurn={setPlayerTurn}
          turnFlow={turnFlow}
        />
      )}
    </div>
  )
}
