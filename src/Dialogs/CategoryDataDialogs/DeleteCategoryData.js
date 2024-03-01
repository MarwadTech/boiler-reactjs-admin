import React, { useState } from 'react'
import { deleteApiWithId } from '../../Services/Apicalling/CommonApi'

const DeleteCategoryData = ({ setDeleteCategoryDialog, actionData, fetchData }) => {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const categoryDelete = async () => {
        try {
            const deleteApi = await deleteApiWithId(actionData.id, "category");
            if (deleteApi.data) {
                setMessage(deleteApi.data.message);
                setTimeout(() => {
                    setDeleteCategoryDialog()
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
                <h4>Delete Category</h4>
                <p>Are you sure </p>
                <p className='m-0'><b>Name</b></p>
                <p className=' flex-wrap overflow-x-scroll'>{actionData.name}</p>
                <div>
                </div>
                <p>is Deleted</p>
                <p className={`${error ? 'text-danger' : 'text-success'} `}>{message}</p>
                <div className='d-flex justify-content-end  '>
                    <button className={`btn  btn-outline-primary-emphasis me-3 text-color `} onClick={() => setDeleteCategoryDialog()}>NO</button>

                    <button className="buttons" onClick={() => categoryDelete()}>YES</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCategoryData