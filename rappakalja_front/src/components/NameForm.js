import { useState } from "react";

const NameForm = ({addPlayer}) => {
    const [name, setName] = useState("")

    const handleNameChange = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setName(event.target.value)
    }
    
    const handleAddPlayer = (event) => {
        event.preventDefault()
        console.log(`Adding ${name.trim()} to the game!`)
        addPlayer(name.trim())
        setName("")
    }

    return (
        <form onSubmit={handleAddPlayer}>
          <input type="text" value={name} id="nameInput" onChange={handleNameChange} placeholder="Kirjoita nimesi tähän..." />
          <button type="submit">Tallenna</button>
        </form>
    )
}

export default NameForm