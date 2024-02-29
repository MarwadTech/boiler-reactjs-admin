import React, { useEffect, useState } from 'react'
import { closeIcon, } from '../../Assets/Index';
import Imageupload from '../../Components/Imageupload';

const UpdateUserProfile = ({ action, setUserProfileData }) => {


    const [imgId, setImgId] = useState()
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(false)
    const [postImgId, setPostImgId] = useState(
        {
            image_id: imgId
        }
    )
    useEffect(() => {
        setPostImgId(prevState => ({
            ...prevState,
            image_id: imgId
        }));
    }, [imgId]);



    const handleupdataprofile = () => {
        console.log(postImgId);

    }

    console.log({ postImgId, imgId });





    return (
        <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100  w-100  position-fixed start-0 top-0 z-2 bg-white`} >
            <div className={`px-4 py-3   shadow rounded w-300  bg-white color border-color`}>
                {/* Close button */}
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-link text-dark m-0 py-0 px-0' onClick={() => setUserProfileData()}><img src={closeIcon} alt="close" /></button>
                </div>
                <h3 className='text-center mb-4'>Update Profile</h3>


                <Imageupload className={"w-50"} defaultimage={action.avatar && action.avatar.pic_large} error={error} setError={setError} setMessage={setMessage} setImgId={setImgId} />


                <p className={`${error ? 'text-danger' : 'text-success'} m-1`}>{message}</p>
                <div className='d-flex justify-content-center'>
                    <button className={`my-3 buttons`} onClick={handleupdataprofile}>Update</button>
                </div>


            </div>
        </div>
    )
}

export default UpdateUserProfile