import { useState, useEffect } from "react";
import rappakaljaService from "./services/rappakalja"
import NameForm from "./components/NameForm";
import ExplanationForm from "./components/ExplanationForm";
import Explanations from "./components/Explanations";
import InfoRow from "./components/InfoRow";
import SwitchRoleButton from "./components/SwitchRoleButton";
import Notification from "./components/Notification";

function App() {
  const [name, setName] = useState("")
  const [explanations, setExplanations] = useState([])
  const [hamy, setHamy] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    rappakaljaService.getExplanations().then(explanations =>
      setExplanations( explanations )
    )  
  }, [])

  const addPlayer = (name) => {
    try {
      setName(name)
    } catch (exception) {
      console.log(exception)
    }
  }

  const addExplanation = (explanationContent) => {
    try {
      const explanation = {
        content: explanationContent,
        player: name
      }
      rappakaljaService.addExplanation(explanation)

      if (explanations.map(e => e.player).includes(explanation.player)) {
        setExplanations(explanations.map(e => {
          if (e.player === explanation.player) {
            return {content: explanationContent, player: e.player}
          } else return e
        }))
      } else setExplanations(explanations.concat(explanation))
      
      showNotification("Selitys lähetetty!")

    } catch (exception) {
      console.log(exception)
    }
  }

  const updateExplanations = () => {
    rappakaljaService.getExplanations().then(explanations =>
      setExplanations( explanations )
    )  
  }

  const showNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => setNotificationMessage(null), 5000)
  }

  if (name === "") {
    return (
      <div>
        <h1>Rappakalja</h1>
        <NameForm addPlayer={addPlayer} />
      </div>
    )
  }

  return (
    <div>
      <h1>Rappakalja</h1>
      <InfoRow hamy={hamy} name={name} />
      <SwitchRoleButton hamy={hamy} setHamy={setHamy} />
      <br/><br/>
      <ExplanationForm addExplanation={addExplanation} />
      <Notification message={notificationMessage} />
      <Explanations hamy={hamy} updateExplanations={updateExplanations} explanations={explanations} />
    </div>
  )

}

export default App
