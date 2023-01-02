import { useState } from "react";

const ExplanationForm = ({addExplanation}) => {
    const [explanationContent, setExplanationContent] = useState("")

    const handleChangeExplanation = (event) => {
        event.preventDefault()
        setExplanationContent(event.target.value)
    }

    const handleAddExplanation = (event) => {
        event.preventDefault()
        addExplanation(explanationContent)
        setExplanationContent("")
    }

    return (
        <form onSubmit={handleAddExplanation}>
            <input type="text" value={explanationContent} onChange={handleChangeExplanation} id="explanationField" placeholder="Kirjoita selityksesi tähän..." />
            <button type="submit">Lähetä</button>
        </form>
    )

}

export default ExplanationForm