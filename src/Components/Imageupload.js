import React, { useEffect, useRef, useState } from 'react'
import { addIcon, logo } from '../Assets/Index';
import { imagePostApiWithCollection } from '../Services/Apicalling/CommonApi';
import TorshMessage from './TorshMessage';

const Imageupload = ({ defaultimage, error, setError, setTorsh, setMessage, setImgId, className }) => {
    const [displayImg, setDisplayImg] = useState('');
    const fileInputRef = useRef(null);
    const [img, setImg] = useState(null);

    const handleButtonClick = () => {
        setError('')
        setMessage('')
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
        setImgId(168965)
        setTorsh(true)
        setMessage("upload Image successfully");
        // try {
        //     const postapi = await imagePostApiWithCollection("icon", img);

        //     if (postapi.data) {
        //         setImgId(postapi.data.data.id);
        //         setError(false);
        //         setMessage(postapi.data.message);
        //     } else {
        //         setError(true)
        //         setMessage("Something went wrong")
        //     }
        // } catch (error) {
        //     setError(true)
        //     setMessage("Something went wrong")
        // }
    };

    useEffect(() => {
        if (displayImg) {
            Imageuploaded();
        }
    }, [displayImg])



    return (
        <>
            <div className={`position-relative  mx-auto border p-1 rounded  m-2 ${className} ${error === "img" && 'border-danger'} `}>
                <img src={displayImg || defaultimage || logo} height={150} alt="Selected" className='w-100 object-fit-contain ' />
                <div className="position-absolute bottom-0 end-0 cursor-pointer" onClick={handleButtonClick}> <img src={addIcon} alt="add" /></div>
                <input type="file" accept="image/*" className="form-control d-none" id="addicon" ref={fileInputRef} onChange={handleImageChange} />
            </div>
        </>
    )
}

export default Imageupload