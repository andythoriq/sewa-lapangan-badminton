import React, { useEffect } from 'react';
import { Outlet, useLocation, Navigate } from "react-router-dom"
import Navbar from './Navbar'
import { namaApp, dirIcon } from "./Services/config";
import PermissionDenied from "../Pages/PermissionDenied";
import Sidebar from './Sidebar';

const Layout = () => {

    const token = localStorage.getItem('token');
    const isRole = localStorage.getItem('role');

    let curLoc = useLocation();
    useEffect(() => {
        const titleMap = [
            {path: '/login', title:'Login'},
            {path: '/dashboard', title:'Dashboard'},
            {path: '/create-booking', title:'Create Booking'},
            {path: '/schedule', title:'Schedule'},
            {path: '/history-booking', title:'History Booking'},
            {path: '/data-master', title:'Data Master'},
            {path: '/user-management', title:'User Management'},
            {path: '/setting', title:'Setting'},
        ];
        const curTitle = titleMap.find(item => item.path === curLoc.pathname)
        if (curTitle && curTitle.title){
            document.title = curTitle.title + ' - ' +namaApp;
        }else{
            document.title = namaApp;
        }
    }, [curLoc]);

    return (
        <>
            {token ? 
            <>
                {curLoc.pathname==='/login' ? 
                    <Navigate to="/dashboard" state={{ from: curLoc }} replace />
                    :
                    isRole==="admin" ?
                        <div className="d-flex" id="wrapper">
                            <Sidebar/>
                            <div id="page-content-wrapper">
                                <Navbar/>
                                <div className="container-fluid"><Outlet /></div>
                                <footer>
                                    <div className="footer"><img src={`${dirIcon}c.png`} alt="" width={25}/><div className='text'>2023. PKL Cibione.</div></div>
                                </footer>
                            </div>
                        </div>
                    :
                    isRole==="user" ?
                        <Outlet />
                    :
                    <PermissionDenied/>
                }
            </> 
            : <Outlet /> }
        </> 
    )
}
export default Layout