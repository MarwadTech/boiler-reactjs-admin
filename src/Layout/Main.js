import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Main = () => {
    return (
        <div>
            {/* Render Header component */}
            <Header />
            {/* Render Sidebar component */}
            <Sidebar />
            {/* Content area */}
            <div className={`p-1 text-color`} style={{ height: 'calc(100vh - 62px)' }}>
                {/* Render content of nested routes */}
                <Outlet />
            </div>
        </div>
    )
}

export default Main