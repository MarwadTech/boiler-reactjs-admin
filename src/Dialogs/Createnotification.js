import React, { useEffect, useState } from 'react'
import { closeIcon } from '../Assets/Index'
import { imagePostApiWithCollection } from '../Services/Apicalling/CommonApi';
import { notificationPostApiWithData } from '../Services/Apicalling/NotificationApi';

const Createnotification = ({ setNotificationCreate, action }) => {

    const [img, setImg] = useState(null);
    const [imgId, setImgId] = useState();
    const [error, setError] = useState()
    const [message, setMessage] = useState('')
    const [loader, setLoader] = useState(false)
    const [notificationData, setNotificationData] = useState({
        role: "user",
        image_id: imgId,
        users: [action.id]
    })


    useEffect(() => {
        setNotificationData((prevData) => ({
            ...prevData,
            image_id: imgId,
        }));
    }, [imgId]);


    const selectImage = (e) => {
        setError('')
        setMessage('')
        const selectedFile = e.target.files[0];
        setImg(selectedFile);


    };


    const handlePostImage = () => {
        const validateAndSubmit = async () => {
            try {
                const postapi = await imagePostApiWithCollection("notification", img);
                if (postapi.data) {
                    setImgId(postapi.data.data.id);
                    console.log(postapi.data.data.id);
                    setError(false);
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
            setMessage("Please Select Image")
        } else {
            validateAndSubmit();
        }
    };


    const handleChange = (e) => {
        setError('')
        setMessage('')
        const { name, value } = e.target
        setNotificationData((prevState) => ({ ...prevState, [name]: value }));
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const validateAndSubmit = async () => {
            console.log(notificationData);
            try {
                const postapi = await notificationPostApiWithData(notificationData)
                if (postapi.data) {
                    console.log({ ookk: postapi });

                } else {
                    console.log({ ni: postapi });

                }
            } catch (error) {
                console.log({ error });

            }
        }
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
        <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white `} >
            <div className={`px-4 py-3 shadow rounded mx-3 border-color bg-white`}>
                <div className='d-flex  justify-content-end'>
                    <button className='btn btn-link  m-0 py-0 px-0 ' onClick={() => setNotificationCreate()}><img src={closeIcon} alt="close" /></button>
                </div>
                <h3 className='text-center'>Create Notification</h3>
                <div className="input-group mb-2">
                    <input type="file" className={`form-control focus-ring focus-ring-light color ${error === 'image' && 'border-danger'}`}
                        onChange={selectImage} aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                    <button className={`buttons`} onClick={handlePostImage}>
                        {loader && <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                        Add </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-1">
                        <input type="text" value={notificationData.heading} onChange={handleChange}
                            className={`form-control focus-ring focus-ring-light color ${error === 'heading' && 'border-danger'}`}
                            id="name" placeholder="Message" name='heading' maxLength={25} required />
                        <label htmlFor="name">Heading </label>
                    </div>
                    <div className="form-floating mb-1">
                        <input type="text"
                            className={`form-control focus-ring focus-ring-light text-color`}
                            id="user" placeholder="user" onChange={handleChange} value={action.full_name} readOnly />
                        <label htmlFor="user" >
                            user
                        </label>
                    </div>

                    <div className="form-floating">
                        <textarea className={`form-control focus-ring focus-ring-light color ${error === 'content' && 'border-danger'}`} value={notificationData.content} name='content' onChange={handleChange} placeholder="Leave a comment here" id="content" required style={{ height: 80 }} />
                        <label htmlFor="content">Content </label>
                    </div>
                    <p className={`${error ? 'text-danger' : 'text-success'}`}>{message}</p>
                    <div className='d-flex justify-content-center'>
                        <button className='my-2 buttons' type='submit' style={loader ? { backgroundColor: "#691b9a85" } : {}} disabled={loader} >
                            Send Notification</button>
                    </div>
                </form>














            </div>
        </div>
    )
}

export default Createnotification