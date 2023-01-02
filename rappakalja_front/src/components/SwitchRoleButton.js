const SwitchRoleButton = ({hamy, setHamy}) => {
    
    if (hamy) {
        return (
            <button onClick={() => setHamy(false)}>Siirry selittäjäksi</button>
        )
    }

    return (
        <button onClick={() => setHamy(true)}>Siirry hämyksi</button>
    )
}

export default SwitchRoleButton