import React, { useState } from 'react'
import { LoadingTopBar } from '../../Components/Loadingbar'
import { useParams } from 'react-router-dom';

const UserDetails = () => {
    const { id } = useParams();
    const [progress, setProgress] = useState(100);
    return (
        <>
            <LoadingTopBar Progress={progress} />
            <div className='my-2'>
                <h3>User Details</h3>
            </div>
            <p>{id}</p>
        </>
    )
}

export default UserDetails