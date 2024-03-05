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

                {error &&
                    <div className={`alert text-bg-danger w-25-90 p-2 ps-3 mx-auto`} role="alert">
                        <img src={errorIcon} alt="error" className='me-2' /> {message}
                    </div>
                }
                {torsh &&
                    <div className={`alert text-bg-success w-25-90 p-2 ps-3 mx-auto`} role="alert">
                        <img src={successIcon} alt="success" className='me-2' /> {message}
                    </div>
                }
            </div>
        </>
    )
}

export default TorshMessage