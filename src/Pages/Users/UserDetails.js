import React, { useEffect, useState } from 'react'
import { LoadingTopBar } from '../../Components/Loadingbar'
import { useParams } from 'react-router-dom';
import { OnlineStatusApiCalling } from '../../Components/OfflineOnlineIndicator';
import { getUserApiWithId } from '../../Services/Apicalling/UserApi';
import Errordialog from '../../Dialogs/Errordialog';
import { callIcon, logo, mailIcon } from '../../Assets/Index';
import { StarRat } from '../../Components/FiveStar';





const UserDetails = () => {
    // Accessing route parameters
    const { id } = useParams();
    const [progress, setProgress] = useState(100);
    const [userData, setUserData] = useState({})
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogData, setErrorDialogData] = useState({})

    // Function to fetch user data based on the user ID
    const fetchData = async () => {
        try {
            const result = await getUserApiWithId(id);
            if (result.data) {
                setUserData(result.data.data)
                console.log(result.data.data);
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
                </div>
                {errorDialog && <Errordialog errorDialogData={errorDialogData} />}
                <OnlineStatusApiCalling fetchData={fetchData} />
                <div className=''>
                    <div className="row m-1  row-cols-1 row-cols-md-2">
                        <div className="col rounded p-1  " >
                            <div className="card text-color p-3 h-100">
                                <div className=" d-flex align-items-center mb-3">
                                    <img src={userData.avatar ? userData.avatar.pic_thumbnail || logo : logo} alt="Load..." className='card-img rounded float-start me-2' style={{
                                        width: '90px', aspectRatio: '1 / 1',
                                        border: '1px solid #6A1B9A'
                                    }} />
                                    <div className=' col h-100 my-auto float-start ms-1    w-100'>
                                        <p className="card-title"><b>{userData.name}</b> </p>
                                        <p className="card-text my-1"><img src={callIcon} alt="call" className='me-3' /><b>+91 {userData.phone_number} </b></p>
                                        <p className="card-text my-1"><img src={mailIcon} alt="call" className='me-3' /><b>{userData.email} </b></p>
                                    </div>
                                </div>
                                <div>
                                    <p><b>Rating : </b> <StarRat rat={parseFloat(userData.avg_rating) || 0} />
                                    </p>
                                </div>
                                <div className=''>
                                    <p className=''><b>Role :</b> {userData.role}</p>
                                    {userData.created_at && <p className='my-0'><b>Created On : </b>{new Date(userData.created_at.split("T")[0]).toDateString()}</p>}
                                    {userData.updated_at && <p className='my-0'><b>Updated On : </b>{new Date(userData.updated_at.split("T")[0]).toDateString()}</p>}

                                    {userData.addresses && userData.addresses.map((address, index) => {
                                        if (address.is_default) {
                                            return (
                                                <div key={index}>
                                                    <p className='m-0 mt-2'><b>Addresses</b></p>
                                                    <p className='m-0 ms-2'><b>User Name : </b> {address.user_name}</p>
                                                    <p className='m-0  ms-2'><b>Phone_Number : </b> {address.phone_number}</p>
                                                    <p className='m-0 mt-1  ms-2'><b>{address.type}</b></p>
                                                    <p className='m-0 ms-2'>{address.line_1 || ""} {address.line_2 || ""} </p>
                                                    <p className=' ms-2'>{address.city || ""} {address.state || ""} ({address.pin_code || ""}) </p>
                                                </div>
                                            );
                                        }
                                    })}

                                </div>
                            </div>
                        </div>

                        <div className="col rounded p-1  " >
                            <div className="card color p-3 h-100">



                                {userData.about && <div>
                                    <p className='m-0'><b><b>About</b></b></p>
                                    <p className='ms-1'> {userData.about}</p>
                                </div>}


                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default UserDetails