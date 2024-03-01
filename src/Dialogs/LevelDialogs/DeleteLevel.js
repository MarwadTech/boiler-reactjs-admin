import React, { useState } from 'react'
import { deleteApiWithId } from '../../Services/Apicalling/CommonApi';

const DeleteLevel = ({ setDeleteLevelDialog, actionData, fetchData }) => {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const levelDelete = async () => {
        try {
            const deleteApi = await deleteApiWithId(actionData.id, "level");
            if (deleteApi.data) {
                setMessage(deleteApi.data.message);
                setTimeout(() => {
                    setDeleteLevelDialog()
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
                <h4>Delete User</h4>
                <p>Are you sure </p>
                <p className='m-0'><b>Level </b>{actionData.level}</p>
                <p className='flex-wrap overflow-x-scroll'></p>
                <p className='m-0'><b>Title</b></p>
                <p className=' flex-wrap overflow-x-scroll'>{actionData.title}</p>
                <p className=''><b>Percentage : </b>{actionData.percentage}</p>

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