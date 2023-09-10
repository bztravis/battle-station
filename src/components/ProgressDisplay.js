import React from 'react'
import styles from '../styles/progressDisplay.css'

export const ProgressDisplay = ({ statName, current, max, barColor }) => {
    return (
      <div>
        <span className="smallText">
          {statName} ({current} / {max})
        </span>
        <div className="bar">
          <div
            className={"barSection"}
            style={{
              width: `${(current / max) * 100}%`,
              background: barColor
            }}
          ></div>
        </div>
      </div>
    );
  };