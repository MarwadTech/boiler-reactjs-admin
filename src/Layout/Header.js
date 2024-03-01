import React, { useState } from 'react'
import { closeMenuIcon, logo, logoutIcon, menuIcon } from '../Assets/Index'
import Logout from '../Dialogs/Logout';
import { Menu } from './Sidebar';

const Header = () => {
    const [menu, setMenu] = useState(false);
    const [logoutmodalshow, setLogoutModalShow] = useState(false);
    return (
        <>
            <nav className='navbar custom-background text-white bg-color' style={{ height: '60px' }}>
                <div className={`container-fluid `}>
                    <div className='d-flex gap-2 '>
                        <img src={logo} alt="local Finds" className='rounded' width={40} height={40} />
                        <h5 className={`mt-2 `} ><b>Boiler Plate</b></h5>
                    </div>
                    <div className="d-flex gap-1 ">
                        <button type="button" className={`btn btn-outline-primary-emphasis d-none d-lg-block text-white`} onClick={() => setLogoutModalShow(true)}>
                            <img src={logoutIcon} /><span className='ms-1 '><b>Log Out</b></span>
                        </button>

                        <button className='btn btn-link d-lg-none m-0 ps-0' onClick={() => setMenu(!menu)}>
                            {!menu ? <img src={menuIcon} alt="Menu" /> : <img src={closeMenuIcon} alt="Close" />}
                        </button>
                    </div>
                </div>
            </nav>
            {menu && <Menu setMenu={setMenu} />}
            {logoutmodalshow && <Logout setLogoutModalShow={setLogoutModalShow} />}
        </>
    )
}

export default Header