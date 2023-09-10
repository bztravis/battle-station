import React from 'react'
import { useState, useEffect } from 'react'
import PreGameScreen from './components/PreGameScreen'
import GameView from './components/GameView'

export default function BattleStation() {
  const [drives, setDrives] = useState([])
  const [inGame, setInGame] = useState(true)
  useEffect(() => {
    window.electronAPI.onUpdateDrives((event, drives) => {
      console.log(drives)
      setDrives(drives)
    })
  }, [])
  return (
    <>
      {inGame ? (
        <GameView drives={drives} setInGame={setInGame} />
      ) : (
        <PreGameScreen drives={drives} setInGame={setInGame} />
      )}
    </>
  )
}
