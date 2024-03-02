import React, { useEffect, useState } from 'react'
import { LoadingTopBar } from '../Components/Loadingbar'
import { StarRat } from '../Components/FiveStar';
import { logo } from '../Assets/Index';
import { appRatingGetApi } from '../Services/Apicalling/RatingsApi';
import PaginationButtons from '../Components/PaginationButtons';
import { OnlineStatusApiCalling } from '../Components/OfflineOnlineIndicator';
import Errordialog from '../Dialogs/Errordialog';
import { FeedBackListLoader } from '../Components/Loaders/FeedBackListLoader';

const FeedBack = () => {
    const [progress, setProgress] = useState(80);
    const [appRating, setAppRating] = useState([]);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({})
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogData, setErrorDialogData] = useState({})
    const [isLoading, setIsLoading] = useState(false);




    const fetchData = async () => {
        setIsLoading(true)
        try {
            const result = await appRatingGetApi(page);
            if (result.data) {
                setIsLoading(false)
                setAppRating(result.data.data.list);
                setMeta(result.data.data.meta)
                setProgress(100);
            }
            else {
                setErrorDialog(true)
                setErrorDialogData(result.response.data)
            }
        } catch (error) {
            setErrorDialog(true)
            setErrorDialogData("Something went wrong")
        }

    };





    return (
        <>
            <LoadingTopBar Progress={progress} />
            <div id='main' className='rounded border overflow-auto px-2  h-100  '>
                <div className="w-100 px-1">
                    <div className='my-2'>
                        <h3> Feed Back</h3>
                    </div>
                    <div>
                        {errorDialog && <Errordialog errorDialogData={errorDialogData} />}
                        <OnlineStatusApiCalling setIsLoading={setIsLoading} fetchData={fetchData} page={page} />
                        <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">
                            {appRating.map((e) => (
                                <div key={e.id} className="col rounded p-1  " >
                                    <div className="card text-color p-2 h-100">
                                        <div className="">
                                            <div className="  d-flex align-items-center">
                                                <img
                                                    src={e.giver && e.giver.avatar && e.giver.avatar.pic_large || logo}
                                                    alt="Load..."
                                                    className='card-img rounded single-border-color float-start me-2'
                                                    style={{ width: '80px', aspectRatio: '1 / 1', }}
                                                />
                                                <div className='h-100 w-100 my-auto float-start ms-1'>
                                                    <p className="card-title overflow-x-hidden"><b>{e.giver && e.giver.full_name}</b></p>
                                                    <p className="card-text my-1"><b>Phone Number : </b>{e.giver && e.giver.phone_number}</p>
                                                    <p className="card-text my-1"><b>User Type: </b>{e.giver && e.giver.active_user_type}</p>
                                                </div>
                                            </div>
                                            {e.giver && e.giver.addresses[0] && <div className="card-text ">
                                                <p className='m-0'><b>Addresses </b></p>
                                                <p className='m-0'>{e.giver.addresses[0].type || ''} </p>
                                                <p className='mb-1'>{
                                                    `${e.giver.addresses[0].line_1 || ''} ${e.giver.addresses[0].line_2 || ''} ${e.giver.addresses[0].city || ''} ${e.giver.addresses[0].state || ''} (${e.giver.addresses[0].pin_code || ''})`
                                                }</p>
                                            </div>}
                                            <div className=''>
                                                <div className='d-flex justify-content-between'>
                                                    <div className="card-text my-1">
                                                        <b>Rating :</b> <StarRat rat={parseFloat(e.value)} />
                                                    </div>
                                                </div>
                                                <p className='m-0'><b>Review</b></p>
                                                <div className=' overflow-auto ' style={{ maxHeight: "100px" }}>
                                                    <p>{e.comment
                                                    }</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {isLoading ? (
                            <FeedBackListLoader />
                        ) : (
                            meta.total >= 11 && <PaginationButtons meta={meta} page={page} setPage={setPage} />
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default FeedBack