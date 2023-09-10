import React from 'react'
import { useState, useEffect } from 'react'
import PreGameScreen from './components/PreGameScreen'

export default function BattleStation() {
  let [drives, setDrives] = useState([])
  useEffect(() => {
    window.electronAPI.onUpdateDrives((event, drives) => {
      setDrives(drives)
    })
  }, [])
  return (
    <>
      <PreGameScreen drives={drives} />
      {JSON.stringify(drives)}
    </>
  )
}
