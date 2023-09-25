import { createContext, useState } from "react";
import axios from "../src/api/axios";

const UserContext = createContext();

function Provider({ children }) {
  const [ token, setToken ] = useState('')
  const [ user, setUser ] = useState({})

  return (
    <UserContext.Provider value={
      {token, setToken, user, setUser}
    }>
      {children}
    </UserContext.Provider>
  )
}

export { Provider }
export default UserContext
