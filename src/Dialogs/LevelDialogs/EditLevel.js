import React, { useState } from 'react'
import { closeIcon } from '../../Assets/Index';

const EditLevel = ({ setEditLevelDialog, activeData }) => {

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [levelData, setLevelData] = useState({})




    const handleChange = (e) => {
        setError('')
        setMessage('')
        const { name, value } = e.target
        setLevelData((prevState) => ({ ...prevState, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const validateAndSubmit = async () => {
            console.log({ levelData });
            setMessage("Level Update successfully")
            setTimeout(() => {
                setEditLevelDialog()
            }, 500)
        };

        if (Object.keys(levelData).length === 0) {
            setError(true);
            setMessage("Please update at least one field");
        } else if (!levelData.title && levelData.title === "") {
            setError('title');
            setMessage("Please Enter title");
        }
        else if (/ \s/.test(levelData.title)) {
            setError('title');
            setMessage("Please remove extra spaces");
        }
        else {
            validateAndSubmit();
        }
    };













    return (
        <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white `} >
            <div className={`px-4 py-3 shadow rounded w-300 border-color bg-white`}>
                <div className='d-flex  justify-content-end'>
                    <button className='btn btn-link  m-0 py-0 px-0 ' onClick={() => setEditLevelDialog()}><img src={closeIcon} alt="close" /></button>
                </div>
                <h4 className='text-center  mb-4'>Update Level</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-1">
                        <input type="number"
                            className={`form-control focus-ring focus-ring-light text-color ${error === 'level' && 'border-danger'}`}
                            id="level" placeholder="Level" name='level' onChange={handleChange} defaultValue={activeData.level} required />
                        <label htmlFor="level">Level</label>
                    </div>
                    <div className="form-floating mb-1">
                        <input type="text"
                            className={`form-control focus-ring focus-ring-light text-color ${error === 'title' && 'border-danger'}`}
                            id="title" placeholder="Title" name='title' onChange={handleChange} defaultValue={activeData.title} required />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating mb-1">
                        <input type="number"
                            className={`form-control focus-ring focus-ring-light text-color ${error === 'percentage' && 'border-danger'}`}
                            id="percentage" placeholder="Percentage" name='percentage' onChange={handleChange} defaultValue={activeData.percentage} onKeyDown={(e) => {
                                if (e.target.value.length >= 3 && e.key !== 'Backspace' && e.key !== 'Delete') {
                                    e.preventDefault();
                                }
                            }} required />
                        <label htmlFor="percentage">Percentage</label>
                    </div>
                    <p className={`${error ? 'text-danger' : 'text-success'}`}>{message}</p>
                    <div className='d-flex justify-content-center'>
                        <button className='my-2 buttons' type='submit'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditLevel