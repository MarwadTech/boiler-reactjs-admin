import React, { useEffect, useRef, useState } from 'react'
import { addIcon, closeIcon, closeMenuIcon, logo } from '../../Assets/Index';
import { imagePostApiWithCollection } from '../../Services/Apicalling/CommonApi';

const UpdateUserProfile = ({ action, setUserProfileData }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false)
    const [img, setImg] = useState(null);
    const [loader, setLoader] = useState(false)
    const [postImgId, setPostImgId] = useState(
        {
            image_id: ""
        }
    )
    // Ref for accessing file input
    const fileInputRef = useRef(null);

    // Icon for displaying selected image
    const [displayImg, setDisplayImg] = useState('');

    // Function to trigger file input click
    const handleButtonClick = () => {
        setError()
        fileInputRef.current.click();
    };

    // Function to handle image selection
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setImg(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDisplayImg(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
        setMessage('')
        setLoader(true)
    };

    const Imageuploaded = async () => {
        try {
            const postapi = await imagePostApiWithCollection("icon", img);
            console.log({ postapi });

            if (postapi.data) {
                setPostImgId({ image_id: postapi.data.data.id });
                setError(false);
                setMessage(postapi.data.message);
            } else {
                setError(true)
                setMessage("Something went wrong")
            }
        } catch (error) {
            console.log(error);
            setError(true)
            setMessage("Something went wrong")
        }
    };

    useEffect(() => {
        if (displayImg) {
            Imageuploaded();
        }
    }, [displayImg])



    const handleupdataprofile = () => {
        console.log(postImgId);

    }












    return (
        <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white`} >
            <div className={`px-4 py-3   shadow rounded w-300  bg-white color border-color`}>
                {/* Close button */}
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-link text-dark m-0 py-0 px-0' onClick={() => setUserProfileData()}><img src={closeIcon} alt="close" /></button>
                </div>
                <h3 className='text-center mb-4'>Update Profile</h3>
                {/* <p>in {data.name}</p> */}
                {/* <p>{data.id}</p> */}
                <div className={`position-relative w-50 mx-auto border p-1 rounded ${error && 'border-danger'} `}>
                    <img src={displayImg || action.avatar && action.avatar.pic_large || logo} alt="Selected" className='w-100' />
                    <div className="position-absolute bottom-0 end-0 cursor-pointer" onClick={handleButtonClick}> <img src={addIcon} alt="add" /></div>

                </div>
                <input type="file" accept="image/*" className="form-control d-none" id="addicon" ref={fileInputRef} onChange={handleImageChange} />


                <p className={`${error ? 'text-danger' : 'text-success'} m-1`}>{message}</p>
                <div className='d-flex justify-content-center'>
                    <button className={`my-3 buttons`} onClick={handleupdataprofile}>Update</button>
                </div>


            </div>
        </div>
    )
}

export default UpdateUserProfile