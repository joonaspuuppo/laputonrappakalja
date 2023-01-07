const infoRow = ({hamy, name}) => {

    if (hamy) return <p className="infoRow">Pelaaja: {name} | Rooli: Hämy</p>

    return <p className="infoRow">Pelaaja: {name} | Rooli: Selittäjä</p>

}

export default infoRow