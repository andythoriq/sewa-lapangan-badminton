import { createContext, useState } from "react";
import secureLocalStorage from "react-secure-storage";

const NotificationContext = createContext()

function NotificationProvider({children}) {

  const [ triggerNotif, setTriggerNotif ] = useState(false)
  const [ gorName, setGorName ] = useState('')
  const [ contact, setContact ] = useState({})

  const handleSetContact = (data) => {
    setContact(data)
    secureLocalStorage.setItem('contact', data)
  }

  const handleSetGorName = (data) => {
    setGorName(data)
    secureLocalStorage.setItem('gor_name', data)
  }

  return (
    <NotificationContext.Provider value={
      {setTriggerNotif, triggerNotif, handleSetGorName, handleSetContact}
    }>
      {children}
    </NotificationContext.Provider>
  )
}

export {NotificationProvider}
export default NotificationContext