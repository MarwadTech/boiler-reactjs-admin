import React, { useState } from 'react'
import { closeIcon } from '../../Assets/Index'
import { commonDataPostApiWithData } from '../../Services/Apicalling/CommonDataApi'

const Addcommondata = ({ setCommonDataAdd, fetchData }) => {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [commonData, setCommonData] = useState()
    const handleChange = (e) => {
        setError('')
        setMessage('')
        const { name, value } = e.target
        setCommonData((prevState) => ({ ...prevState, [name]: value }));

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const validateAndSubmit = async () => {
            try {
                const addApi = await commonDataPostApiWithData(commonData);
                if (addApi.data && addApi.data.success) {
                    setMessage(addApi.data.message)
                    setTimeout(() => {
                        setCommonDataAdd()
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
        <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white `} >
            <div className={`px-4 py-3 shadow rounded w-300 border-color bg-white`}>
                <div className='d-flex  justify-content-end'>
                    <button className='btn btn-link  m-0 py-0 px-0 ' onClick={() => setCommonDataAdd()}><img src={closeIcon} alt="close" /></button>
                </div>
                <h4 className='text-center  mb-4'>Add Common Data</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-1">
                        <input type="text"
                            className={`form-control focus-ring focus-ring-light text-color ${error === 'key' && 'border-danger'}`}
                            id="key" placeholder="Key" name='key' onChange={handleChange} required />
                        <label htmlFor="key">Key</label>
                    </div>
                    <div className="form-floating mb-1">
                        <input type="text"
                            className={`form-control focus-ring focus-ring-light text-color ${error === 'message' && 'border-danger'}`}
                            id="data" placeholder="Data" name='data' onChange={handleChange} required />
                        <label htmlFor="data">Data</label>
                    </div>
                    <p className={`${error ? 'text-danger' : 'text-success'}`}>{message}</p>
                    <div className='d-flex justify-content-center'>
                        <button className='my-2 buttons' type='submit'>Add Common Data</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addcommondata