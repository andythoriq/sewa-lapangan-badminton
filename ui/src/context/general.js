import { createContext, useState } from "react";
import secureLocalStorage from "react-secure-storage";

const GeneralContext = createContext()

function GeneralProvider({children}) {

  const [ triggerNotif, setTriggerNotif ] = useState(false)
  const [ gorName, setGorName ] = useState('')
  const [ contact, setContact ] = useState({})
  const [expiration, setExpiration] = useState({resend_limit: null, customer_expiration: null, recent_resend: null})

  const [resendPhoneNumber, setResendPhoneNumber] = useState('')

  const handleSetContact = (data) => {
    setContact(data)
    secureLocalStorage.setItem('contact', data)
  }

  const handleSetGorName = (data) => {
    setGorName(data)
    secureLocalStorage.setItem('gor_name', data)
  }

  return (
    <GeneralContext.Provider value={
      {setTriggerNotif, triggerNotif, handleSetGorName, handleSetContact, setResendPhoneNumber, resendPhoneNumber, setExpiration, expiration}
    }>
      {children}
    </GeneralContext.Provider>
  )
}

export { GeneralProvider }
export default GeneralContext