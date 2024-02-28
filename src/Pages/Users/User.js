import React, { useEffect, useState } from 'react'
import { LoadingTopBar } from '../../Components/Loadingbar'
import { addIcon, callIcon, deleteIcon, editIcon, logo, moreIcon, notificationIcon } from '../../Assets/Index'
import { useNavigate } from 'react-router-dom'
import { userGetApiWithPage } from '../../Services/Apicalling/UserApi'
import Errordialog from '../../Dialogs/Errordialog'
import PaginationButtons from '../../Components/PaginationButtons'
import { OnlineStatusApiCalling } from '../../Components/OfflineOnlineIndicator'
import Edituser from '../../Dialogs/UserDialogs/EditUser'
import DeleteUser from '../../Dialogs/UserDialogs/DeleteUser'
import UpdateUserProfile from '../../Dialogs/UserDialogs/UpdateUserProfile'
import Createnotification from '../../Dialogs/Createnotification'
import { UserListLoader } from '../../Components/Loaders/UserListLoader'

const User = () => {
    const [progress, setProgress] = useState(80)
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({});
    const [action, setAction] = useState();
    const [userDataList, setUserDataList] = useState([]);
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogData, setErrorDialogData] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [userEditData, setUserEditData] = useState(false)
    const [userDeleteData, setUserDeleteData] = useState(false)
    const [userProfileData, setUserProfileData] = useState(false)

    const [notificationCreate, setNotificationCreate] = useState(false)



    const edituserdata = (data) => {
        setUserEditData(true)
        setAction(data)
    }

    const deleteuserdata = (data) => {
        setUserDeleteData(true)
        setAction(data)
    }
    const updateUserProfile = (data) => {
        setUserProfileData(true)
        setAction(data)
    }
    const notificationcreatedata = (data) => {
        setNotificationCreate(true)
        setAction(data)
    }

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const result = await userGetApiWithPage(page);
            if (result.data) {
                setUserDataList(result.data.data.list);
                console.log(result.data.data.list);
                setMeta(result.data.data.meta)
                setIsLoading(false);
                setProgress(100);
            } else {
                setErrorDialogData(result.response.data)
                setErrorDialog(true)
            }
        } catch (error) {
            setErrorDialogData("Something went wrong")
            setErrorDialog(true)
        }
    };


    return (
        <>
            <LoadingTopBar Progress={progress} />
            <div className='my-2'>
                <h3>User</h3>
            </div>

            <OnlineStatusApiCalling setIsLoading={setIsLoading} fetchData={fetchData} page={page} />
            {errorDialog && <Errordialog errorDialogData={errorDialogData} />}
            {notificationCreate && <Createnotification setNotificationCreate={setNotificationCreate} action={action} />}
            {userEditData && <Edituser setUserEditData={setUserEditData} action={action} fetchData={fetchData} />}
            {userDeleteData && <DeleteUser setUserDeleteData={setUserDeleteData} action={action} fetchData={fetchData} />}
            {userProfileData && <UpdateUserProfile setUserProfileData={setUserProfileData} action={action} fetchData={fetchData} />}

            <div>
                <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">
                    {userDataList.map((e) => (
                        <div className="col rounded p-1 " >
                            <div className="card color p-2 h-100 ">
                                <div className='d-flex text-color' >
                                    {/* <div className='me-1'>
                                        <img src={e.avatar && e.avatar.pic_large || logo} alt="" width={80} height={80} className=' rounded single-border-color me-1' />
                                    </div> */}

                                    <button className=' m-0 p-0 rounded position-relative single-border-color me-2' onClick={() => updateUserProfile(e)} >
                                        <img src={e.avatar && e.avatar.pic_large || logo} width={80} height={80} alt="profile" className='rounded' />
                                        <div className="position-absolute bottom-0 end-0 me-1"><img src={addIcon} alt="add" style={{ width: '15px' }} /></div>
                                    </button>
                                    <div>
                                        <p className='m-0'><b>{e.full_name}</b></p>
                                        <p className='m-0'><img src={callIcon} alt="" className='me-1' />{e.phone_number}</p>
                                    </div>
                                </div>
                                <div className='mt-1'>
                                    {/* <button className='buttons p-0' style={{ width: '130px' }} onClick={() => navigate(`/learnerdetails`)}>More Details</button> */}
                                    <div className='w-100   d-flex justify-content-around align-items-center '>
                                        <button className={`btnlink  m-0 p-1 px-2 text-color`} onClick={() => edituserdata(e)}><img src={editIcon} alt="edit" />
                                            {/* <br /><span style={{ fontSize: '10px' }}>Update</span> */}
                                        </button>

                                        <button className={`btnlink m-0 p-1 px-2 text-color`} onClick={() => deleteuserdata(e)}> <img src={deleteIcon} alt="delete" />
                                            {/* <br /><span style={{ fontSize: '10px' }}>Delete</span> */}
                                        </button>

                                        <button className={`btnlink m-0 p-1 px-2 text-color`} onClick={() => notificationcreatedata(e)}><img src={notificationIcon} alt="notification" />
                                            {/* <br /><span style={{ fontSize: '10px' }}>Notification</span> */}
                                        </button>

                                        <button className={`btnlink m-0 p-1 px-2 text-color`} onClick={() => navigate(`/userdetails/${e.id}`)}><img src={moreIcon} alt="more" />
                                            {/* <br /><span style={{ fontSize: '10px' }}> More Details</span> */}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {isLoading ? (
                    <UserListLoader />
                ) : (
                    meta.total >= 11 && <PaginationButtons meta={meta} page={page} setPage={setPage} />
                )}
            </div>
        </>
    )
}

export default User