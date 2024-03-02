import React, { useEffect, useState } from 'react'
import { LoadingTopBar } from '../../Components/Loadingbar'
import { useParams } from 'react-router-dom';
import { OnlineStatusApiCalling } from '../../Components/OfflineOnlineIndicator';
import { userGetApiWithId } from '../../Services/Apicalling/UserApi';
import Errordialog from '../../Dialogs/Errordialog';





const UserDetails = () => {
    const { id } = useParams();
    const [progress, setProgress] = useState(100);
    const [userData, setUserData] = useState({})
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogData, setErrorDialogData] = useState({})

    const fetchData = async () => {
        try {
            const result = await userGetApiWithId(id);
            if (result.data) {
                setUserData(result.data.data)
                setProgress(100)
            } else {
                setErrorDialogData(result.response.data)
                setErrorDialog(true)
            }
        } catch (error) {
            setErrorDialogData("Something went wrong");
            setErrorDialog(true);
        }
    };






    return (
        <>
            <LoadingTopBar Progress={progress} />
            <div className='rounded border overflow-auto m-1  h-100  '>
                <div className="w-100 px-2">
                    <div className='my-2'>
                        <h3>User Details</h3>
                    </div>
                    {errorDialog && <Errordialog errorDialogData={errorDialogData} />}
                    <OnlineStatusApiCalling fetchData={fetchData} />
                    {/* <p>{id}</p> */}























                </div>
            </div>
        </>
    )
}

export default UserDetails