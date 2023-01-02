import Explanation from "./Explanation"

const Explanations = ({explanations, updateExplanations, hamy}) => {
    
    if (!hamy) return null

    const handleUpdateExplanations = (event) => {
        event.preventDefault()
        updateExplanations()
    }

    return(
        <div>
            <h2 id="selitykset">Selitykset</h2>
            <button  id="updateButton" onClick={handleUpdateExplanations}><img src="refresh-svgrepo-com.svg" alt="refresh" width="30px" height="30px"/></button>
            <div id="explanations">{explanations.map(e => <Explanation key={e.player} explanation={e} />)}
            </div>
        </div>
    )
}

export default Explanations