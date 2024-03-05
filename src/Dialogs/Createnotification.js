import React, { useEffect, useState } from 'react'
import { closeIcon } from '../Assets/Index'
import { imagePostApiWithCollection } from '../Services/Apicalling/CommonApi';
import { postNotificationApi } from '../Services/Apicalling/NotificationApi';
import TorshMessage from '../Components/TorshMessage';

const Createnotification = ({ setCreateNotificationDialog, actionData, type }) => {
    const [torsh, setTorsh] = useState(false)
    const [img, setImg] = useState(null);
    const [imgId, setImgId] = useState();
    const [error, setError] = useState()
    const [message, setMessage] = useState('')
    const [loader, setLoader] = useState(false)

    const [notificationData, setNotificationData] = useState({
        role: "user",
        image_id: imgId,
        ...(type === "user" && { users: [actionData.id] }),
        ...(type === "all" && { users: "" })
    });

    // Update notification data when imgId changes
    useEffect(() => {
        setNotificationData((prevData) => ({
            ...prevData,
            image_id: imgId,
        }));
    }, [imgId]);

    // Function to handle image selection
    const selectImage = (e) => {
        setError('')
        setMessage('')
        setTorsh(false)
        const selectedFile = e.target.files[0];
        setImg(selectedFile);


    };

    // Function to handle image posting
    const handlePostImage = () => {
        const validateAndSubmit = async () => {
            try {
                const postapi = await imagePostApiWithCollection("notification", img);
                if (postapi.data) {
                    setImgId(postapi.data.data.id);
                    setTorsh(true)
                    setError(false);
                    // console.log(postapi.data.message);
                    setMessage(postapi.data.message);
                } else {
                    setError(true)
                    setMessage("Something went wrong")
                }
            } catch (error) {
                setError(true)
                setMessage("Something went wrong")
            }

        };
        if (!img) {
            setError('image')
            // setTorsh(true)
            setMessage("Please Select Image")
        } else {
            validateAndSubmit();
        }
    };


    // Function to handle changes in form inputs
    const handleChange = (e) => {
        setError('')
        setMessage('')
        setTorsh(false)
        const { name, value } = e.target
        setNotificationData((prevState) => ({ ...prevState, [name]: value }));
    }

    // Function to handle form submit
    const validateAndSubmit = async () => {
        try {
            const postapi = await postNotificationApi(notificationData)
            if (postapi.data) {
                setTorsh(true)
                setMessage(postapi.data.message)
                setTimeout(() => {
                    setCreateNotificationDialog();
                }, 500)
            } else if (postapi.response.data.errors) {
                setTorsh(true)
                setError(postapi.response.data.errors[0].key)
                setMessage(postapi.response.data.errors[0].message)
            }
        } catch (error) {
            setError(true)
            setMessage("something wesnt wrong")
        }
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (notificationData.heading.trim() === "") {
            setError('heading');
            setMessage("Please Enter Heading");
        }
        else if (/ \s/.test(notificationData.heading)) {
            setError('heading');
            setMessage("Please remove exrta space");
        }
        else if (notificationData.content.trim() === "") {
            setError('content');
            setMessage("Please Enter Content");
        }
        else if (/ \s/.test(notificationData.content)) {
            setError('content');
            setMessage("Please remove exrta space");
        }
        else if (img) {
            if (!imgId) {
                setError("image")
                setMessage("Add image");
            } else {
                validateAndSubmit()
            }
        } else {
            validateAndSubmit()
        }

    }






    return (
        <>
            {/* TorshMessage component for displaying messages */}
            <TorshMessage error={error} message={message} torsh={torsh} setTorsh={setTorsh} />
            <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white `} >
                <div className={`px-4 py-3 shadow rounded mx-3 border-color bg-white`}>
                    <div className='d-flex  justify-content-end'>
                        {/* Close button */}
                        <button className='btn btn-link  m-0 py-0 px-0 ' onClick={() => setCreateNotificationDialog()}><img src={closeIcon} alt="close" /></button>
                    </div>
                    <h3 className='text-center'>Create Notification</h3>
                    {/* Image upload input */}
                    <div className="input-group mb-2">
                        <input type="file" className={`form-control focus-ring focus-ring-light text-color ${error === 'image' && 'border-danger'}`}
                            onChange={selectImage} aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                        <button className={`buttons`} onClick={handlePostImage}>
                            {loader && <div className="spinner-border spinner-border-sm me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>}
                            Add </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Heading input */}
                        <div className="form-floating mb-1">
                            <input type="text" value={notificationData.heading} onChange={handleChange}
                                className={`form-control focus-ring focus-ring-light text-color ${error === 'heading' && 'border-danger'}`}
                                id="name" placeholder="Message" name='heading' maxLength={25} required />
                            <label htmlFor="name">Heading </label>
                        </div>
                        {/* Display user input for type === "user" */}
                        {type === "user" && <div className="form-floating mb-1">
                            <input type="text"
                                className={`form-control focus-ring focus-ring-light text-color`}
                                id="user" placeholder="user" onChange={handleChange} value={actionData.full_name} readOnly />
                            <label htmlFor="user" >
                                user
                            </label>
                        </div>}
                        {/* Content input */}
                        <div className="form-floating">
                            <textarea className={`form-control focus-ring focus-ring-light text-color ${error === 'content' && 'border-danger'}`} value={notificationData.content} name='content' onChange={handleChange} placeholder="Leave a comment here" id="content" required style={{ height: 80 }} />
                            <label htmlFor="content">Content </label>
                        </div>

                        {/* <p className={`${error ? 'text-danger' : 'text-success'}`}>{message}</p> */}
                        <div className='d-flex justify-content-center'>
                            {/* Submit button */}
                            <button className='my-2 buttons' type='submit' style={loader ? { backgroundColor: "#691b9a85" } : {}} disabled={loader} >
                                Send Notification</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Createnotification