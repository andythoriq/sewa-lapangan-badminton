import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom"
import NotFound from "../Pages/NotFound";

const RequireAuth = ({role=''}) => {
    const token = localStorage.getItem('token');
    const isRole = localStorage.getItem('role');
    const location = useLocation()
    
    return (
        token && (role===isRole) 
        ? (role==='admin' || role==='user') ? <Outlet /> : <NotFound/>
        : <Navigate to="/" state={{ from: location }} replace />
    )
}
export default RequireAuth