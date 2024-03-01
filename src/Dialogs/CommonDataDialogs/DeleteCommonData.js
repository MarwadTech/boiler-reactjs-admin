import React, { useState } from 'react'
import { deleteApiWithId } from '../../Services/Apicalling/CommonApi'

const Deletecommondata = ({ actionData, setDeleteCommonDataDialog, fetchData }) => {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const Commondatadelete = async () => {
        try {
            const deleteApi = await deleteApiWithId(actionData.id, "commondata");
            if (deleteApi.data) {
                setMessage(deleteApi.data.message);
                setTimeout(() => {
                    setDeleteCommonDataDialog()
                    fetchData()
                }, 500)
            } else {
                if (deleteApi.response.data.errors) {
                    setError(true)
                    setMessage(deleteApi.response.data.errors[0].message)
                } else {
                    setMessage(deleteApi.response.data.message)
                }
            }
        } catch (error) {
            setError(true)
            setMessage("something went wrong")
        }
    }

    return (
        <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white`} >
            <div className={`px-4 py-3  shadow rounded w-300  bg-white color border-color`}>
                <h4>Delete Common Data</h4>
                <p>Are you sure </p>
                <p className='m-0'><b>Key</b></p>
                <p className=' flex-wrap overflow-x-scroll'>{actionData.key}</p>
                <p className='m-0'><b>Data</b></p>
                <p className=' flex-wrap overflow-x-scroll'>{actionData.data}</p>
                <div>
                </div>
                <p>is Deleted</p>
                <p className={`${error ? 'text-danger' : 'text-success'} `}>{message}</p>
                <div className='d-flex justify-content-end  '>
                    <button className={`btn  btn-outline-primary-emphasis me-3 text-color `} onClick={() => setDeleteCommonDataDialog()}>NO</button>

                    <button className="buttons" onClick={() => Commondatadelete()}>YES</button>
                </div>
            </div>
        </div>
    )
}

export default Deletecommondata