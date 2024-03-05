import React, { useState } from 'react'
import { closeIcon } from '../../Assets/Index'
import { postCommonDataApi } from '../../Services/Apicalling/CommonDataApi'
import TorshMessage from '../../Components/TorshMessage'

const Addcommondata = ({ setAddCommonDataDialog, fetchData }) => {
    const [torsh, setTorsh] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [commonData, setCommonData] = useState()

    // Function to handle input change
    const handleChange = (e) => {
        setError('')
        setMessage('')
        setTorsh(false)
        const { name, value } = e.target
        setCommonData((prevState) => ({ ...prevState, [name]: value.trim() }));

    }

    // Function to validate form inputs and submit common data
    const validateAndSubmit = async () => {
        try {
            const addApi = await postCommonDataApi(commonData);
            if (addApi.data) {
                setTorsh(true)
                console.log(addApi.data.message);
                setMessage(addApi.data.message)
                setTimeout(() => {
                    setAddCommonDataDialog()
                    fetchData()
                }, 500)
            }
            else if (addApi.response) {
                if (addApi.response.data.errors.length != 0) {
                    console.log(addApi.response.data);
                    // setError(addApi.response.data.errors[0].key)
                    // setMessage(addApi.response.data.errors[0].message)
                }
            }
        } catch (error) {
            setError(true)
            console.log({ aaa: error });
            setMessage("something wesnt wrong")
        }
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (commonData.key.trim() === "") {
            setError('key');
            setMessage("Please Enter Key");
        }
        else if (/\s/.test(commonData.key)) {
            setError('key');
            setMessage("Please replace space with this ' _ '");
        } else if (/[a-z]/.test(commonData.key)) {
            setError('key');
            setMessage("Key should contain uppercase characters");
        }
        else if (commonData.data.trim() === "") {
            setError('data');
            setMessage("Please Enter data");
        }
        else if (/ \s/.test(commonData.data)) {
            setError('data');
            setMessage("Please remove extra spaces");
        }
        else {
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
                        <button className='btn btn-link  m-0 py-0 px-0 ' onClick={() => setAddCommonDataDialog()}><img src={closeIcon} alt="close" /></button>
                    </div>
                    <h4 className='text-center  mb-4'>Add Common Data</h4>
                    <form onSubmit={handleSubmit}>
                        {/* Input field for key */}
                        <div className="form-floating mb-1">
                            <input type="text"
                                className={`form-control focus-ring focus-ring-light text-color ${error === 'key' && 'border-danger'}`}
                                id="key" placeholder="Key" name='key' onChange={handleChange} required />
                            <label htmlFor="key">Key</label>
                        </div>
                        {/* Input field for data */}
                        <div className="form-floating mb-1">
                            <input type="text"
                                className={`form-control focus-ring focus-ring-light text-color ${error === 'data' && 'border-danger'}`}
                                id="data" placeholder="Data" name='data' onChange={handleChange} required />
                            <label htmlFor="data">Data</label>
                        </div>
                        {/* <p className={`${error ? 'text-danger' : 'text-success'}`}>{message}</p> */}
                        <div className='d-flex justify-content-center'>
                            {/* Submit button */}
                            <button className='my-2 buttons' type='submit'>Add Common Data</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Addcommondata