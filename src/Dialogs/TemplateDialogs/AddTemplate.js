import React, { useEffect, useState } from 'react'
import { closeIcon, template } from '../../Assets/Index'
import Imageupload from '../../Components/Imageupload'
import { postTemplateApi } from '../../Services/Apicalling/TemplateApi'
import TorshMessage from '../../Components/TorshMessage'

const AddTemplate = ({ setAddTemplateDialog, fetchData }) => {
    const [torsh, setTorsh] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [imgId, setImgId] = useState()
    const [newTemplateData, setNewTemplateData] = useState({
        image_id: imgId
    })

    // Update newTemplateData when imgId changes
    useEffect(() => {
        setNewTemplateData((prevData) => ({
            ...prevData,
            image_id: imgId,
        }));
    }, [imgId]);

    // Function to handle input change
    const handleChange = (e) => {
        setError('')
        setMessage('')
        setTorsh(false)
        const { name, value } = e.target
        setNewTemplateData((prevState) => ({ ...prevState, [name]: value.trim() }));

    }


    // Function to validate form inputs and submit new template data
    const validateAndSubmit = async () => {
        try {
            const addApi = await postTemplateApi(newTemplateData);
            if (addApi.data && addApi.data.success) {
                setTorsh(true)
                setMessage(addApi.data.message)
                setTimeout(() => {
                    setAddTemplateDialog()
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

        if (!imgId) {
            setError("img");
            setMessage("Please add image");
        } else if (newTemplateData.title == " ") {
            setError("title");
            setMessage("Please enter name");
        } else if (/ \s/.test(newTemplateData.title)) {
            setError("title");
            setMessage("Please remove exrta space");
        }
        else if (newTemplateData.description == " ") {
            setError('description');
            setMessage("Please enter description");
        } else if (/ \s/.test(newTemplateData.description)) {
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
                        <button className='btn btn-link  m-0 py-0 px-0 ' onClick={() => setAddTemplateDialog()}><img src={closeIcon} alt="close" /></button>
                    </div>
                    <h4 className='text-center  mb-4'>Add Template</h4>

                    <Imageupload className={"w-100"} defaultimage={template} setTorsh={setTorsh} error={error} setError={setError} setMessage={setMessage} setImgId={setImgId} />

                    <form onSubmit={handleSubmit}>
                        {/* Imageupload component */}
                        <div className="form-floating mb-1">
                            <input type="text"
                                className={`form-control focus-ring focus-ring-light text-color ${error === 'title' && 'border-danger'}`}
                                id="title" placeholder="Title" name='title' onChange={handleChange} required />
                            <label htmlFor="title">Title</label>
                        </div>
                        {/* Textarea for description */}
                        <div className="form-floating">
                            <textarea className={`form-control focus-ring focus-ring-light text-color ${error === 'description' && 'border-danger'}`} name='description' onChange={handleChange} placeholder="Description" id="description" required style={{ height: 80 }} />
                            <label htmlFor="content">Description </label>
                        </div>

                        {/* <p className={`${error ? 'text-danger' : 'text-success'}`}>{message}</p> */}
                        <div className='d-flex justify-content-center'>
                            {/* Submit button */}
                            <button className='my-2 buttons' type='submit'>Add Template</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddTemplate