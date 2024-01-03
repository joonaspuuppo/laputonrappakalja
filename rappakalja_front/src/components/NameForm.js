import { useState } from "react";

const NameForm = ({addPlayer}) => {
    const [playerName, setPlayerName] = useState("")
    const [gameName, setGameName] = useState("")
    
    const handleAddPlayer = (event) => {
        event.preventDefault()
        console.log(`Adding ${playerName.trim()} to ${gameName.trim()}!`)
        
        setPlayerName("")
        setGameName("")
    }

    return (
        <form onSubmit={handleAddPlayer}>
          <input type="text" value={playerName} id="playerNameInput" onChange={(e) => setPlayerName(e.target.value)} placeholder="Kirjoita nimesi tähän..." />
          <input type="text" value={gameName} id="gameNameInput" onChange={(e) => setGameName(e.target.value)} placeholder="Kirjoita pelin nimi tähän..." />
          <button type="submit">Tallenna</button>
        </form>
    )
}

export default NameForm