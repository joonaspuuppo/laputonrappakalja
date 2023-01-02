import { useState, useEffect } from "react";
import rappakaljaService from "./services/rappakalja"
import NameForm from "./components/NameForm";
import ExplanationForm from "./components/ExplanationForm";
import Explanations from "./components/Explanations";
import InfoRow from "./components/InfoRow";
import SwitchRoleButton from "./components/SwitchRoleButton";

function App() {
  const [name, setName] = useState("")
  const [explanations, setExplanations] = useState([])
  const [hamy, setHamy] = useState(false)

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
      setExplanations(explanations.concat(explanation))
    } catch (exception) {
      console.log(exception)
    }
  }

  const updateExplanations = () => {
    rappakaljaService.getExplanations().then(explanations =>
      setExplanations( explanations )
    )  
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
      <Explanations hamy={hamy} updateExplanations={updateExplanations} explanations={explanations} />
    </div>
  )

}

export default App
