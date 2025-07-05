import { useEffect, useState } from "react";

const Notifications = ({ userEmail }) => {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const fetchNotifications = async () => {
            const res = await fetch (`http://localhost:3001/api/walkRequest/notifications/`, {
                credentials: 'include'
            })
            const data = await res.json()
            setNotifications(data)
        }

        fetchNotifications()
        const interval = setInterval(fetchNotifications, 15000)
        return () => clearInterval(interval)
    }, [userEmail])

    return (
        <div className="notifications">
            {notifications.length > 0 ? (
                <p>У вас {notifications.length} входящих уведомлений</p>
            ) : (
                <p>у Вас нет входящих уведомлений</p>
            )}
        </div>
    )
}

export default Notifications