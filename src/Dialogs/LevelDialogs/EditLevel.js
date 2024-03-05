import React, { useState } from 'react'
import { closeIcon } from '../../Assets/Index';
import { patchLevelApi } from '../../Services/Apicalling/LovelApi';
import TorshMessage from '../../Components/TorshMessage';

const EditLevel = ({ setEditLevelDialog, actionData, fetchData }) => {
    const [torsh, setTorsh] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [updatelevelData, setUpdateLevelData] = useState({})

    // Function to handle input change
    const handleChange = (e) => {
        setError('')
        setMessage('')
        setTorsh(false)
        const { name, value } = e.target
        setUpdateLevelData((prevState) => ({ ...prevState, [name]: value.trim() }));
    }

    // Function to validate form inputs and submit updated level data
    const validateAndSubmit = async () => {
        try {
            console.log({ updatelevelData });
            const addApi = await patchLevelApi(actionData.id, updatelevelData);
            if (addApi.data) {
                setTorsh(true)
                setMessage(addApi.data.message)
                setTimeout(() => {
                    setEditLevelDialog()
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
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(updatelevelData).length === 0) {
            setError(true);
            setMessage("Please update at least one field");
        } else if (!updatelevelData.title && updatelevelData.title === "") {
            setError('title');
            setMessage("Please Enter title");
        }
        else if (/ \s/.test(updatelevelData.title)) {
            setError('title');
            setMessage("Please remove extra spaces");
        }
        else {
            validateAndSubmit();
        }
    };

    return (
        <>
            {/* TorshMessage component for displaying messages */}
            <TorshMessage error={error} message={message} torsh={torsh} setTorsh={setTorsh} />
            <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white `} >
                <div className={`px-4 py-3 shadow rounded w-300 border-color bg-white`}>
                    <div className='d-flex  justify-content-end'>
                        {/* Close button */}
                        <button className='btn btn-link  m-0 py-0 px-0 ' onClick={() => setEditLevelDialog()}><img src={closeIcon} alt="close" /></button>
                    </div>
                    <h4 className='text-center  mb-4'>Update Level</h4>
                    <form onSubmit={handleSubmit}>
                        {/* Input field for level */}
                        <div className="form-floating mb-1">
                            <input type="number"
                                className={`form-control focus-ring focus-ring-light text-color ${error === 'level' && 'border-danger'}`}
                                id="level" placeholder="Level" name='level' onChange={handleChange} defaultValue={actionData.level} required />
                            <label htmlFor="level">Level</label>
                        </div>
                        {/* Input field for title */}
                        <div className="form-floating mb-1">
                            <input type="text"
                                className={`form-control focus-ring focus-ring-light text-color ${error === 'title' && 'border-danger'}`}
                                id="title" placeholder="Title" name='title' onChange={handleChange} defaultValue={actionData.title} required />
                            <label htmlFor="title">Title</label>
                        </div>
                        {/* Input field for percentage */}
                        <div className="form-floating mb-1">
                            <input type="number"
                                className={`form-control focus-ring focus-ring-light text-color ${error === 'percentage' && 'border-danger'}`}
                                id="percentage" placeholder="Percentage" name='percentage' onChange={handleChange} defaultValue={actionData.percentage} onKeyDown={(e) => {
                                    if (e.target.value.length >= 3 && e.key !== 'Backspace' && e.key !== 'Delete') {
                                        e.preventDefault();
                                    }
                                }} required />
                            <label htmlFor="percentage">Percentage</label>
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

export default EditLevel