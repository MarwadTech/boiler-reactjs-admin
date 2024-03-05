import React from 'react'
import { Link } from 'react-router-dom'

const Logout = ({ setLogoutModalShow }) => {

    return (
        <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white`} >
            <div className={`px-4 py-3 shadow rounded w-300 bg-white text-color border-color `}>
                <h4>Logout</h4>
                {/* Confirmation message */}
                <p>are you sure you want to logout ?</p>
                <div className='d-flex justify-content-end  '>
                    {/* Buttons */}
                    <button className={`btn btn-outline-primary-emphasis me-3 text-color `} onClick={() => setLogoutModalShow()}>NO</button>
                    <Link to='/login'>
                        <button className="buttons" onClick={() => localStorage.removeItem('token')} >YES</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Logout