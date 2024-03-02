import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Main = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            {/* <div className={`rounded border overflow-auto p-1 px-3 me-1 mt-1 text-color`} style={{ height: 'calc(100vh - 70px)' }}> */}
            <div className={`p-1 text-color`} style={{ height: 'calc(100vh - 62px)' }}>
                <Outlet />
            </div>
        </div>
    )
}

export default Main