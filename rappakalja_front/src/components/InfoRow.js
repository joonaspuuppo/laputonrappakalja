const infoRow = ({hamy, name}) => {
    
    const pickNumber = () => {
        const number = Math.floor(Math.random() * 6) + 1
        return number === 6 ? "?" : number
      }

    if (hamy) return <p className="infoRow">Pelaaja: {name} | Rooli: Hämy | {pickNumber()}</p>

    return <p className="infoRow">Pelaaja: {name} | Rooli: Selittäjä</p>

}

export default infoRow