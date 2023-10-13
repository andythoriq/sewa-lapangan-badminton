import { createContext, useState } from "react";

const NotificationContext = createContext()

function NotificationProvider({children}) {

  const [ triggerNotif, setTriggerNotif ] = useState(false)

  return (
    <NotificationContext.Provider value={
      {setTriggerNotif, triggerNotif}
    }>
      {children}
    </NotificationContext.Provider>
  )
}

export {NotificationProvider}
export default NotificationContext