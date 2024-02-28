import React, { useEffect, useState } from 'react'
import { LoadingTopBar } from '../Components/Loadingbar'
import { eyeHideIcon, eyeShowIcon, logo } from '../Assets/Index';
import { notificationGetApi } from '../Services/Apicalling/NotificationApi';
import PaginationButtons from '../Components/PaginationButtons';
import { OnlineStatusApiCalling } from '../Components/OfflineOnlineIndicator';
import Errordialog from '../Dialogs/Errordialog';
import { NotificationListLoader } from '../Components/Loaders/NotificationListLoader';

const Notification = () => {
    const [progress, setProgress] = useState(80);
    const [page, setPage] = useState(1);
    const [notificationsList, setNotificationList] = useState([])
    const [meta, setMeta] = useState({})
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogData, setErrorDialogData] = useState({})
    const [isLoading, setIsLoading] = useState(false);








    const fetchData = async () => {
        try {
            setIsLoading(true)
            const result = await notificationGetApi(page);
            console.log({ result });
            if (result.data) {
                console.log(result.data.data.list);
                setNotificationList(result.data.data.list);
                setMeta(result.data.data.meta)
                setIsLoading(false)
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
                <h3> Notification</h3>
            </div>
            {errorDialog && <Errordialog errorDialogData={errorDialogData} />}
            <OnlineStatusApiCalling setIsLoading={setIsLoading} fetchData={fetchData} page={page} />
            <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">
                {notificationsList.map((e) => (
                    <div className="col rounded p-1 " >
                        <div className="card color p-2 h-100 ">
                            <div className='d-flex text-color' >
                                <div className='me-1'>
                                    <img src={logo} alt="" width={80} height={80} className=' rounded single-border-color me-1' />
                                </div>
                                <div className='w-100'>
                                    <p className='m-0'><b>{e.heading}</b></p>
                                    <div className='d-flex justify-content-between '>
                                        <p className='card-text m-0 ' >Category : {e.activity}</p>
                                        <p className={` color m-0`}>Read {e.read_at ? <img src={eyeShowIcon} alt="show" /> : <img src={eyeHideIcon} alt="hide" />}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='text-color'>

                                <p className='m-0'><b>Contents</b></p>
                                <p className='m-0'>{e.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isLoading ? (
                <NotificationListLoader />
            ) : (
                meta.total >= 11 && <PaginationButtons meta={meta} page={page} setPage={setPage} />
            )}



        </>
    )
}

export default Notification