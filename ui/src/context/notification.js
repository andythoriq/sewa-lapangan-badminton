import { createContext, useState } from "react";

const NotificationContext = createContext()

function NotificationProvider({children}) {

  const [ notifications, setNotifications ] = useState([])
  const [ unreadCount, setUnreadCount ] = useState(0)

  return (
    <NotificationContext.Provider value={
      {notifications, setNotifications, unreadCount, setUnreadCount}
    }>
      {children}
    </NotificationContext.Provider>
  )
}

export {NotificationProvider}
export default NotificationContext