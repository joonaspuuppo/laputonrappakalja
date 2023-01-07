import { useState, useEffect } from "react"

const NumberPicker = ({hamy}) => {
    const [number, setNumber] = useState(null)

    useEffect(() => {
        setNumber(pickNumber())
      }, [hamy])

    const pickNumber = () => {
        const number = Math.floor(Math.random() * 6) + 1
        setNumber(number === 6 ? "?" : number)
        return number === 6 ? "?" : number
    }

    if (!hamy) return null

    return (
        <div>
            <button onClick={pickNumber} id="generateNumberButton">Arvo numero</button>
            <p id="generatedNumber">{number}</p>
        </div>
    )
}

export default NumberPicker
