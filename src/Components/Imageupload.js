import React, { useEffect, useRef, useState } from 'react'
import { addIcon, logo } from '../Assets/Index';
import { imagePostApiWithCollection } from '../Services/Apicalling/CommonApi';

const Imageupload = ({ defaultimage, error, setError, setMessage, setImgId, className }) => {
    const [displayImg, setDisplayImg] = useState('');
    const fileInputRef = useRef(null);
    const [img, setImg] = useState(null);

    const handleButtonClick = () => {
        setError()
        fileInputRef.current.click();
    };

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

    }

    const Imageuploaded = async () => {
        try {
            const postapi = await imagePostApiWithCollection("icon", img);
            console.log({ postapi });

            if (postapi.data) {
                console.log(postapi.data.data.id);
                setImgId(postapi.data.data.id);
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

    return (
        <>
            <div className={`position-relative  mx-auto border p-1 rounded ${className} ${error && 'border-danger'} `}>
                <img src={displayImg || defaultimage || logo} alt="Selected" className='w-100' />
                <div className="position-absolute bottom-0 end-0 cursor-pointer" onClick={handleButtonClick}> <img src={addIcon} alt="add" /></div>
                <input type="file" accept="image/*" className="form-control d-none" id="addicon" ref={fileInputRef} onChange={handleImageChange} />

            </div>
        </>
    )
}

export default Imageupload