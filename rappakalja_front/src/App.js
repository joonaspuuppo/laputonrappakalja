import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addPlayer } from "./services/rappakalja"
import NameForm from "./components/NameForm";
import ExplanationForm from "./components/ExplanationForm";
import Explanations from "./components/Explanations";
import InfoRow from "./components/InfoRow";
import SwitchRoleButton from "./components/SwitchRoleButton";
import Notification from "./components/Notification";
import NumberPicker from "./components/NumberPicker";

function App() {
  const player = useSelector(state => state.player)
  const game = useSelector(state => state.game)
  const dispatch = useDispatch()

  const [hamy, setHamy] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    dispatch()
  }, [game])

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
      <NumberPicker hamy={hamy} />
      <ExplanationForm addExplanation={addExplanation} />
      <Notification message={notificationMessage} />
      <Explanations hamy={hamy} updateExplanations={updateExplanations} explanations={explanations} />
    </div>
  )

}

export default App
