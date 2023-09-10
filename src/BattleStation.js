import React from "react";
import { useState } from "react";
import PreGameScreen from "./components/PreGameScreen";

export default function BattleStation() {
  const [players, setPlayers] = useState({
    player1: {
      name: "your mom",
      accentColor: "#00ffff",
    },
    player2: {
      name: "your dad",
      accentColor: "#0000ff",
    },
  });
  let [drives, setDrives] = useState([]);
  useEffect(() => {
    window.electronAPI.onAddDrive((drive) => {
      setDrives([...drives, drive]);
    });
    window.electronAPI.onRemoveDrive((drive) => {
      setDrives(drives.filter((d) => d !== drive));
    });
  }, []);
  return <PreGameScreen players={players} setPlayers={setPlayers} />;
}
