import React, { useState } from 'react'
import { closeIcon } from '../../Assets/Index'
import { commonDataPatchApiWithData } from '../../Services/Apicalling/CommonDataApi'
import TorshMessage from '../../Components/TorshMessage'

const Editcommondata = ({ setEditCommonDataDialog, actionData, fetchData }) => {
    const [updateCommonData, setUpdateCommonData] = useState({})
    const [error, setError] = useState()
    const [torsh, setTorsh] = useState(false)
    const [message, setMessage] = useState('')
    const handleChange = (e) => {
        setError('')
        setMessage('')
        setTorsh(false)
        const { name, value } = e.target
        setUpdateCommonData((prevState) => ({ ...prevState, [name]: value }));

    }
    const validateAndSubmit = async () => {
        try {
            const UpdateApi = await commonDataPatchApiWithData(actionData.id, updateCommonData);
            if (UpdateApi.data) {
                setTorsh(true)
                setMessage(UpdateApi.data.message);
                setTimeout(() => {
                    setEditCommonDataDialog()
                    fetchData()
                }, 500)
            } else {
                setError(true)
                setTorsh(true)
                setMessage("something went wrong")
            }
        }
        catch (error) {
            setError(true)
            setTorsh(true)
            setMessage("something went wrong")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!updateCommonData || !updateCommonData.data) {
            setError('data');
            setTorsh(true)
            setMessage('Please enter new data');
        } else if (updateCommonData.data.trim() === "") {
            setError('data');
            setTorsh(true)
            setMessage("Please Enter data");
        }
        else if (/ \s/.test(updateCommonData.data)) {
            setError('data');
            setTorsh(true)
            setMessage("Please remove exrta space");
        }
        else {
            validateAndSubmit();
        }
    }


    return (
        <>
            <TorshMessage error={error} message={message} torsh={torsh} setTorsh={setTorsh} />
            <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white `} >
                <div className={`px-4 py-3 shadow rounded w-300 border-color bg-white`}>
                    <div className='d-flex  justify-content-end'>
                        <button className='btn btn-link  m-0 py-0 px-0 ' onClick={() => setEditCommonDataDialog()}><img src={closeIcon} alt="close" /></button>
                    </div>
                    <h4 className='text-center  mb-4'>Edit Common Data</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-1">
                            <input type="text"
                                className={`form-control focus-ring focus-ring-light text-color ${error === 'key' && 'border-danger'}`}
                                id="key" placeholder="Key" name='key' onChange={handleChange} value={actionData.key} readOnly />
                            <label htmlFor="key">Key</label>
                        </div>
                        <div className="form-floating mb-1">
                            <input type="text"
                                className={`form-control focus-ring focus-ring-light text-color ${error === 'data' && 'border-danger'}`}
                                id="data" placeholder="Data" name='data' onChange={handleChange} required defaultValue={actionData.data} />
                            <label htmlFor="data">Data</label>
                        </div>
                        <p className={`${error ? 'text-danger' : 'text-success'}`}>{message}</p>
                        <div className='d-flex justify-content-center'>
                            <button className='my-2 buttons' type='submit'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Editcommondata