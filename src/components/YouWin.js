import React from 'react'
import styles from '../styles/gameView.css'

export default function YouWin({ username }) {
    return (
        <div className="container">
            <h1>{username.toUpperCase()} WON THE MATCH!</h1>
            
        </div>
    )
}