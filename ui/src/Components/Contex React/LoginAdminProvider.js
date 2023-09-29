import {createContext, useState } from "react";
const LoginAdminContext = createContext({});

export const LoginAdminProvider = ({ children }) => {
  const [Login, setLogin] = useState({});

  return(
    <LoginAdminContext.Provider value={{ Login, setLogin }}>
      {children}
    </LoginAdminContext.Provider>
  )
}
export default LoginAdminContext;