import React, { useEffect, useState } from 'react'
import { LoadingTopBar } from '../Components/Loadingbar'
import { arrowUpIcon, eyeHideIcon, eyeShowIcon, logo, notificationSendIcon } from '../Assets/Index';
import { notificationGetApi } from '../Services/Apicalling/NotificationApi';
import PaginationButtons from '../Components/PaginationButtons';
import { OnlineStatusApiCalling } from '../Components/OfflineOnlineIndicator';
import Errordialog from '../Dialogs/Errordialog';
import { NotificationListLoader } from '../Components/Loaders/NotificationListLoader';
import Createnotification from '../Dialogs/Createnotification';
import { InfiniteScroll } from '../Components/InfiniteScroll';

const Notification = () => {
    const [progress, setProgress] = useState(80);
    const [page, setPage] = useState(1);
    const [notificationsList, setNotificationList] = useState([])
    const [meta, setMeta] = useState({})
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogData, setErrorDialogData] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const [createNotificationDialog, setCreateNotificationDialog] = useState(false)










    const fetchData = async () => {
        try {
            setIsLoading(true)
            const result = await notificationGetApi(page);
            if (result.data) {
                if (page === 1) {
                    setNotificationList(result.data.data.list);
                } else {
                    setNotificationList(prevUser => [...prevUser, ...result.data.data.list]);
                }
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

    const main = document.getElementById('main');

    const scrollToTop = () => {
        const mainid = document.getElementById('main');
        mainid.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div id='main' className='rounded border overflow-auto px-2  h-100  '>
                <div className="w-100 px-1">
                    <LoadingTopBar Progress={progress} />

                    <div className='d-flex justify-content-between flex-wrap my-2'>
                        <h3>Notification</h3>
                        <button type="button" className={`btn btn-outline-primary-emphasis rounded-3 text-color`} onClick={() => setCreateNotificationDialog(true)}>
                            <img src={notificationSendIcon} alt="add" className='me-1' />
                            Send </button>
                    </div>
                    {createNotificationDialog && <Createnotification setCreateNotificationDialog={setCreateNotificationDialog} type={"all"} />
                    }
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


                    {
                        isLoading &&
                        <NotificationListLoader />

                    }
                    <InfiniteScroll id={main} page={page} setPage={setPage} meta={meta} fetchData={fetchData} />
                </div>
            </div>

        </>
    )
}

export default Notification