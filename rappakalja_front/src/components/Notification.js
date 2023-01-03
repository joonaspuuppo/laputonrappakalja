const Notification = ({message}) => {
    if (!message) return null

    return (
        <p className="notification">{message}</p>
    )
}

export default Notification