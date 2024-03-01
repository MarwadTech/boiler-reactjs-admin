import React, { useState } from 'react'
import { closeIcon } from '../../Assets/Index'
import { userPutApiWithIdDate } from '../../Services/Apicalling/UserApi'

const Edituser = ({ setEditUserDialog, actionData, fetchData }) => {
    const [error, setError] = useState()
    const [message, setMessage] = useState()
    const [updatedUser, setUpdatedUser] = useState({})

    const handleuserInput = (e) => {
        setError("");
        setMessage("");
        setUpdatedUser((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value.trim() }
        })
    }
    const validateAndSubmit = async () => {
        try {
            const updateApi = await userPutApiWithIdDate(actionData.id, updatedUser);
            if (updateApi.data) {
                setMessage(updateApi.data.message);
                setTimeout(() => {
                    setEditUserDialog();
                    fetchData();
                }, 500)

            } else {
                setError(true)
                setMessage("something went wrong")
            }
        } catch (error) {
            setError(true)
            setMessage("something went wrong")

        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(updatedUser).length === 0) {
            setError(true);
            setMessage("Please update at least one field");
        } else if (updatedUser.full_name == "") {
            setError("name");
            setMessage("Please enter name");
        } else if (/ \s/.test(updatedUser.full_name)) {
            setError("name");
            setMessage("Please remove exrta space");
        }
        else if (updatedUser.phone_number && updatedUser.phone_number.length != 10) {
            setError('number');
            setMessage("Please enter a valid number");
        } else {
            validateAndSubmit();
        }

    }







    return (

        <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white`} >
            <div className={`px-4 py-3    shadow rounded w-300  bg-white color border-color `}>
                <div className='d-flex  justify-content-end'>
                    <button className='btn btn-link text-dark m-0 py-0 px-0 ' onClick={() => setEditUserDialog()}><img src={closeIcon} alt="close" /></button>
                </div>
                <h3 className='text-center  mb-4'>Update User</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="form-floating mb-3 ">
                            <input type="text" className={`form-control focus-ring focus-ring-light text-color ${error === 'name' && 'border-danger'} `} id="full_name" placeholder="Full Name" name='full_name' onChange={handleuserInput} defaultValue={actionData.full_name} required />
                            <label htmlFor="full_name">Full Name</label>
                        </div>
                        <div className="form-floating  mb-3">
                            <input type="number" className={`form-control focus-ring focus-ring-light  text-color ${error === 'number' && 'border-danger'}`} id="phone_number" placeholder="Phone Number" name='phone_number' defaultValue={actionData.phone_number} onChange={handleuserInput} maxLength={10}
                                onKeyDown={(e) => {
                                    if (e.target.value.length >= 10 && e.key !== 'Backspace' && e.key !== 'Delete') {
                                        e.preventDefault();
                                    }
                                }}
                                required />
                            <label htmlFor="phone_number">Phone Number</label>
                        </div>
                    </div>
                    <p className={`${error ? 'text-danger' : 'text-success'} `}>{message}</p>
                    <div className=' d-flex justify-content-center '>
                        <button className='buttons' type='sumbit'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edituser