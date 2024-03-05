import React, { useState } from 'react'
import { closeIcon } from '../../Assets/Index'
import { patchTemplateApi } from '../../Services/Apicalling/TemplateApi'
import TorshMessage from '../../Components/TorshMessage'

const EditTemplate = ({ setEditTemplateDialog, actionData, fetchData }) => {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [imgId, setImgId] = useState()
    const [updateTemplateData, setUpdateTemplateData] = useState({})
    const [torsh, setTorsh] = useState(false)

    // Function to handle input change
    const handleChange = (e) => {
        setError('')
        setTorsh(false)
        setMessage('')
        const { name, value } = e.target
        setUpdateTemplateData((prevState) => ({ ...prevState, [name]: value.trim() }));
    }

    // Function to validate form inputs and submit updated template data
    const validateAndSubmit = async () => {
        try {
            const addApi = await patchTemplateApi(updateTemplateData);
            if (addApi.data) {
                setTorsh(true)
                setMessage(addApi.data.message)
                setTimeout(() => {
                    setEditTemplateDialog()
                    fetchData()
                }, 500)
            }
            else if (addApi.response.data.errors) {
                setError(addApi.response.data.errors[0].key)
                setMessage(addApi.response.data.errors[0].message)
            }
        } catch (error) {
            setError(true)
            setMessage("something wesnt wrong")
        }
    }

    // Function to handle form submission

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(updateTemplateData).length === 0) {
            setError(true);
            setMessage("Please update at least one field");
        } else if (updateTemplateData.title == "") {
            setError("title");
            setMessage("Please enter name");
        } else if (/ \s/.test(updateTemplateData.title)) {
            setError("title");
            setMessage("Please remove exrta space");
        }
        else if (updateTemplateData.description == "") {
            setError('description');
            setMessage("Please enter description");
        } else if (/ \s/.test(updateTemplateData.description)) {
            setError("description");
            setMessage("Please remove exrta space");

        } else {
            validateAndSubmit();
        }
    }


    return (
        <>
            {/* TorshMessage component for displaying messages */}
            <TorshMessage error={error} message={message} torsh={torsh} setTorsh={setTorsh} />
            <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white `} >
                <div className={`px-4 py-3 shadow rounded w-300 border-color bg-white`}>
                    <div className='d-flex  justify-content-end'>
                        {/* Close button */}
                        <button className='btn btn-link  m-0 py-0 px-0 ' onClick={() => setEditTemplateDialog()}><img src={closeIcon} alt="close" /></button>
                    </div>
                    <h4 className='text-center  mb-4'>Update Template</h4>
                    <form onSubmit={handleSubmit}>
                        {/* Input field for title */}
                        <div className="form-floating mb-1">
                            <input type="text"
                                className={`form-control focus-ring focus-ring-light text-color ${error === 'title' && 'border-danger'}`}
                                id="title" placeholder="T" name='title' onChange={handleChange} defaultValue={actionData.title} required />
                            <label htmlFor="title">Title</label>
                        </div>
                        {/* Textarea for description */}
                        <div className="form-floating">
                            <textarea className={`form-control focus-ring focus-ring-light text-color ${error === 'description' && 'border-danger'}`} name='description' onChange={handleChange} placeholder="Description" id="description" defaultValue={actionData.description} required style={{ height: 80 }} />
                            <label htmlFor="content">Description </label>
                        </div>

                        {/* <p className={`${error ? 'text-danger' : 'text-success'}`}>{message}</p> */}
                        <div className='d-flex justify-content-center'>
                            {/* Submit button */}
                            <button className='my-2 buttons' type='submit'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditTemplate