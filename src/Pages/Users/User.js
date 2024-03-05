import React, { useState } from 'react'
import { LoadingTopBar } from '../../Components/Loadingbar'
import { addIcon, callIcon, deleteIcon, editIcon, logo, mailIcon, moreIcon, notificationIcon } from '../../Assets/Index'
import { useNavigate } from 'react-router-dom'
import { getUserApiWithPage } from '../../Services/Apicalling/UserApi'
import Errordialog from '../../Dialogs/Errordialog'
import PaginationButtons from '../../Components/PaginationButtons'
import { OnlineStatusApiCalling } from '../../Components/OfflineOnlineIndicator'
import Edituser from '../../Dialogs/UserDialogs/EditUser'
import UpdateUserProfile from '../../Dialogs/UserDialogs/UpdateUserProfile'
import Createnotification from '../../Dialogs/Createnotification'
import { UserListLoader } from '../../Components/Loaders/UserListLoader'
import DeleteConfirmation from '../../Dialogs/DeleteConfirmation'

const User = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(80)
    const [actionData, setActionData] = useState();
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({});
    const [userDataList, setUserDataList] = useState([]);
    const [errorDialogData, setErrorDialogData] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false)
    const [editUserDialog, setEditUserDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [profileUpdateDialog, setProfileUpdateDialog] = useState(false)
    const [createNotificationDialog, setCreateNotificationDialog] = useState(false)

    // Function to handle various actions on user data
    const action = (type, data) => {
        setActionData(data)
        switch (type) {
            case 'delete':
                setDeleteDialog(true);
                break;
            case 'edit':
                setEditUserDialog(true);
                break;
            case 'notification':
                setCreateNotificationDialog(true);
                break;
            case 'profile':
                setProfileUpdateDialog(true);
                break;
            case 'navigate':
                navigate(`/userdetails/${data.id}`);
                break;
            default:

        }

    }

    // Function to fetch user data from the API
    const fetchData = async () => {
        setIsLoading(true)
        try {
            const result = await getUserApiWithPage(page);
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
            console.log(error.response.data);
            setErrorDialogData((error.response.data) || "Something we nt wrong");
            // setErrorDialogData("Something we nt wrong")
            setErrorDialog(true)
        }
    };


    return (
        <>
            <LoadingTopBar Progress={progress} />
            <div className='rounded border overflow-auto  h-100  '>
                <div className="w-100 px-1">
                    <div className='m-2'>
                        <h3>User</h3>
                    </div>

                    {/* Component to handle online/offline status and fetch data */}
                    <OnlineStatusApiCalling setIsLoading={setIsLoading} fetchData={fetchData} page={page} />
                    {/* Error dialog component */}
                    {errorDialog && <Errordialog errorDialogData={errorDialogData} />}
                    {/* Dialog components for user actions */}
                    {createNotificationDialog && <Createnotification setCreateNotificationDialog={setCreateNotificationDialog} actionData={actionData} type={"user"} />}
                    {editUserDialog && <Edituser setEditUserDialog={setEditUserDialog} actionData={actionData} fetchData={fetchData} />}
                    {/* {deleteUserDialog && <DeleteUser setDeleteUserDialog={setDeleteUserDialog} actionData={actionData} fetchData={fetchData} />} */}
                    {deleteDialog && <DeleteConfirmation setDeleteDialog={setDeleteDialog} actionData={actionData} fetchData={fetchData} type={"user"} />}
                    {profileUpdateDialog && <UpdateUserProfile setProfileUpdateDialog={setProfileUpdateDialog} actionData={actionData} fetchData={fetchData} />}

                    <div className='mx-2 mx-sm-4'>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">
                            {userDataList.map((e) => (
                                <div className="col rounded p-1 " >
                                    <div className="card text-color p-2 h-100 ">
                                        <div className='d-flex text-color h-100' >

                                            <button className=' m-0 p-0 rounded position-relative single-border-color me-2' onClick={() => action("profile", e)} >
                                                <img src={(e.avatar ? e.avatar.pic_medium : logo) || logo} alt="profile" className='rounded ' style={{ width: "80px", height: "80px", aspectRatio: '1 / 1' }} />
                                                <div className="position-absolute bottom-0 end-0 me-1"><img src={addIcon} alt="add" style={{ width: '15px' }} /></div>
                                            </button>
                                            <div>
                                                <p className='m-0'><b>{e.name}</b></p>
                                                <p className='m-0'><img src={callIcon} alt="call" className='me-1' />{e.phone_number}</p>
                                                <p className='m-0'><img src={mailIcon} alt="call" className='me-1' />{e.email}</p>
                                            </div>
                                        </div>
                                        <div className='mt-1'>
                                            <div className='w-100   d-flex justify-content-around align-items-center '>
                                                <button className={`btnlink  m-0 p-1 px-2 text-color`} onClick={() => action("edit", e)}><img src={editIcon} alt="edit" />
                                                    {/* <br /><span style={{ fontSize: '10px' }}>Update</span> */}
                                                </button>

                                                <button className={`btnlink m-0 p-1 px-2 text-color`} onClick={() => action("delete", e)}> <img src={deleteIcon} alt="delete" />
                                                    {/* <br /><span style={{ fontSize: '10px' }}>Delete</span> */}
                                                </button>

                                                <button className={`btnlink m-0 p-1 px-2 text-color`} onClick={() => action("notification", e)}><img src={notificationIcon} alt="notification" />
                                                    {/* <br /><span style={{ fontSize: '10px' }}>Notification</span> */}
                                                </button>

                                                <button className={`btnlink m-0 p-1 px-2 text-color`} onClick={() => action("navigate", e)}><img src={moreIcon} alt="more" />
                                                    {/* <br /><span style={{ fontSize: '10px' }}> More Details</span> */}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>






                    {isLoading ? (
                        <UserListLoader />
                    ) : (
                        meta.total >= 11 && <PaginationButtons meta={meta} page={page} setPage={setPage} />
                    )}
                </div>
            </div>
        </>
    )
}

export default User