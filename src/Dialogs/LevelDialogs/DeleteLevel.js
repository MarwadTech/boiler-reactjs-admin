import React, { useState } from 'react'

const DeleteLevel = ({ setDeleteLevelDialog, activeData }) => {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')



    const levelDelete = () => {
        console.log("level Delete");
        setMessage("Level Delete successfully")
        setTimeout(() => {
            setDeleteLevelDialog()
        }, 500)
    }
    return (
        <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white`} >
            <div className={`px-4 py-3  shadow rounded w-300  bg-white color border-color`}>
                <h4>Delete User</h4>
                <p>Are you sure </p>
                <p className='m-0'><b>Level </b>{activeData.level}</p>
                {/* <p className='flex-wrap overflow-x-scroll'></p> */}
                <p className='m-0'><b>Data</b></p>
                <p className=' flex-wrap overflow-x-scroll'>{activeData.title}</p>
                <p className='m-0'><b>Percentage : </b>{activeData.percentage}</p>
                <div>
                </div>
                <p>is Deleted</p>
                <p className={`${error ? 'text-danger' : 'text-success'} flex-wrap overflow-x-scroll`}>{message}</p>
                <div className='d-flex justify-content-end  '>
                    <button className={`btn  btn-outline-primary-emphasis me-3 text-color `} onClick={() => setDeleteLevelDialog()}>NO</button>

                    <button className="buttons" onClick={() => levelDelete()}>YES</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteLevel