import React, { useState } from 'react'
import { closeIcon } from '../../Assets/Index'
import { categoryPostApiWithData } from '../../Services/Apicalling/CategoryApi'
import TorshMessage from '../../Components/TorshMessage'

const EditCategoryData = ({ actionData, setEditCategoryDialog, fetchData }) => {
    const [torsh, setTorsh] = useState(false)



    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [updateCategoryData, setUpdateCategoryData] = useState({})
    const handleChange = (e) => {
        setError('')
        setMessage('')
        setTorsh(false)
        const { name, value } = e.target
        setUpdateCategoryData((prevState) => ({ ...prevState, [name]: value }));
    }
    const validateAndSubmit = async () => {
        try {
            const addApi = await categoryPostApiWithData(updateCategoryData);
            if (addApi.data && addApi.data.success) {
                setTorsh(true)
                setMessage(addApi.data.message)
                setTimeout(() => {
                    setEditCategoryDialog()
                    fetchData()
                }, 500)
            }
            else if (addApi.response.data.errors) {
                setTorsh(true)
                setError(addApi.response.data.errors[0].key)
                setMessage(addApi.response.data.errors[0].message)
            }
        } catch (error) {
            setError(true)
            setTorsh(true)
            setMessage("something wesnt wrong")
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!updateCategoryData || !updateCategoryData.name) {
            setError('name');
            setTorsh(true)
            setMessage("Please Enter name");
        } else if (/ \s/.test(updateCategoryData.name)) {
            setError('name');
            setTorsh(true)
            setMessage("Please remove extra spaces");
        }
        else {
            validateAndSubmit();
        }
    }








    return (
        <>

            <TorshMessage error={error} message={message} torsh={torsh} setTorsh={setTorsh} />       <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white `} >
                <div className={`px-4 py-3 shadow rounded w-300 border-color bg-white`}>
                    <div className='d-flex  justify-content-end'>
                        <button className='btn btn-link  m-0 py-0 px-0 ' onClick={() => setEditCategoryDialog()}><img src={closeIcon} alt="close" /></button>
                    </div>
                    <h4 className='text-center  mb-4'>Update Category</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-1">
                            <input type="text"
                                className={`form-control focus-ring focus-ring-light text-color ${error === 'name' && 'border-danger'}`}
                                id="name" placeholder="Name" name='name' defaultValue={actionData.name} onChange={handleChange} required />
                            <label htmlFor="name">Name</label>
                        </div>
                        {/* <p className={`${error ? 'text-danger' : 'text-success'}`}>{message}</p> */}
                        <div className='d-flex justify-content-center'>
                            <button className='my-2 buttons' type='submit'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditCategoryData