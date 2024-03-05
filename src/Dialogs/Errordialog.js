import React from 'react'
import { useNavigate } from 'react-router-dom';

const Errordialog = ({ errorDialogData }) => {
    const navigate = useNavigate();
    return (
        <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-3 bg-white`} >
            <div className={`shadow rounded w-300 bg-white overflow-hidden `} >
                <div className='bg-danger text-white p-3 h-75'>
                    {/* Display error message */}
                    <h3>Error {errorDialogData.status_code}</h3>
                    <div className='text-end mt-4'>
                        <p className='m-0'>{errorDialogData.message || errorDialogData}</p>
                    </div>
                </div>
                <div className='text-end h-25'>
                    {/* "Go back" button */}
                    <button className='buttons bg-danger m-2' onClick={() => navigate(-1)}> go back</button>
                </div>
            </div>
        </div>
    )
}

export default Errordialog