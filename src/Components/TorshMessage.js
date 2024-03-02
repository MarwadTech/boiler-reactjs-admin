import React, { useEffect, useState } from 'react'
import { errorIcon, successIcon } from '../Assets/Index'

const TorshMessage = ({ message, error, torsh, setTorsh }) => {

    // const [torsh, setTorsh] = useState(false)
    useEffect(() => {
        if (torsh) {
            setTimeout(() => (
                setTorsh(false)
            ), 1000)
        }
    }, [torsh])
    return (
        <>
            <div className='position-fixed start-0 top-0  w-100 my-4 ' style={{ zIndex: 50 }}>
                {torsh &&
                    <div className={`alert ${error ? "text-bg-danger" : 'text-bg-success'} w-25-90 p-2 ps-3 mx-auto`} role="alert">
                        {error ? <img src={errorIcon} alt="message" className='me-2' /> : <img src={successIcon} alt="success" className='me-2' />}   {message}
                    </div>
                }
            </div>
        </>
    )
}

export default TorshMessage