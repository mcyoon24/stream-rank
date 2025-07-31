import React from "react";
import Sidebar from "./SideBar"; 
import { Outlet } from "react-router-dom";
import './Layout.css';


function Layout({ user }) {
    if (!user){
        return null;
    } 

    return (
        <div className="layout-container">
            <Sidebar user={user}/>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;