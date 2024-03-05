import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { categoryIcon, colorCode, commonDataIcon, dashboardIcon, feedbackIcon, heplAndSupportIcon, levelIcon, logo, logoutIcon, notificationIcon, privacyPolicyIcon, reportIcon, templateIcon, termAndConditionIcon, userIcon } from '../Assets/Index';
import Logout from '../Dialogs/Logout';

// Array of menu items with their respective paths, icons, and titles
const menuItems = [
    { to: "/", icon: dashboardIcon, title: "Dashboard" },
    { to: "/user", icon: userIcon, title: "User" },
    { to: "/level", icon: levelIcon, title: "Level" },
    { to: "/category", icon: categoryIcon, title: "Category" },
    { to: "/template", icon: templateIcon, title: "Template" },
    { to: "/commondata", icon: commonDataIcon, title: "Common Data" },
    { to: "/notification", icon: notificationIcon, title: "Notification" },
    { to: "/feedback", icon: feedbackIcon, title: "Feed Back" },
    { to: "/reports", icon: reportIcon, title: "Reports" },
    { to: "/helpandsupport", icon: heplAndSupportIcon, title: "Help And Support" },
    { to: "/privacy-policy", icon: privacyPolicyIcon, title: "Privacy Policy" },
    { to: "/terms-and-condition", icon: termAndConditionIcon, title: "Terms & Condition" }
];

// Sidebar component
const Sidebar = () => {

    // MenuItem component to render individual menu items  
    const MenuItem = ({ to, icon, title }) => (
        <li className="nav-item">
            <NavLink className={`nav-link`}
                style={{ color: colorCode }}
                to={to} >
                <img src={icon} alt="icon." className='me-2' />
                {title}</NavLink>
        </li>
    );
    return (
        <div className='float-lg-start  mb-2 mb-lg-0 d-none d-lg-block overflow-auto me-1'
            style={{ height: 'calc(100vh - 60px)' }}
        >
            <ul className="nav flex-column mx-3 me-4 " >
                <li className='my-1'></li>
                {menuItems.map((menuItem, index) => (
                    <MenuItem key={index} to={menuItem.to} icon={menuItem.icon} title={menuItem.title} />
                ))}
            </ul>
        </div>
    )
}

export default Sidebar

// Menu component for mobile view
export const Menu = ({ setMenu }) => {
    const [logoutmodalshow, setLogoutModalShow] = useState(false)

    // MenuItem component to render individual menu items
    const MenuItem = ({ to, icon, title, setMenu }) => (
        <div className="m-2">
            <NavLink className={`nav-link p-2`} style={{ color: colorCode }} to={to} onClick={setMenu} >
                <img src={icon} alt="icon." className='me-2' />
                <span>{title}</span>
            </NavLink>
        </div>
    );

    return (
        <div className='w-100 h-100 position-fixed top-0 start-0' style={{ zIndex: 6, marginTop: '50px' }}>
            <style> {`::-webkit-scrollbar {Width: 0px}`}</style>
            <div className={`p-4 pt-3 overflow-auto  position-fixed top-0 start-0 border-color mb-1 bg-white border-color rounded-end-4 h-100`} style={{ zIndex: 6, }}>
                <div className={`text-center `}>
                    <img src={logo} alt='logo' style={{ width: '80px', aspectRatio: '1 / 1' }} className='rounded ' />
                </div>

                {/* Render each menu item */}
                {menuItems.map((menuItem, index) => (
                    <MenuItem key={index} to={menuItem.to} icon={menuItem.icon} title={menuItem.title} setMenu={() => setMenu()} />
                ))}
                {/* Logout button */}
                <div className=" m-2 mt-3">
                    <button className='buttons p-2 w-100 text-start' onClick={() => setLogoutModalShow(true)}>
                        <img src={logoutIcon} alt="icon." className='me-2' />
                        <span>Log Out</span>
                    </button>
                </div>
                {/* Render Logout component if logoutmodalshow state is true */}
                {logoutmodalshow && <Logout setLogoutModalShow={setLogoutModalShow} />}
            </div>
        </div>
    )
}