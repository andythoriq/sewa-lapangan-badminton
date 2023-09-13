import React from "react";
import { Navigate, useLocation } from "react-router-dom"

const Logout = () => {
    const location = useLocation();
    localStorage.clear();
    return (<Navigate to="/" state={{ from: location }} replace />)
}
export default Logout