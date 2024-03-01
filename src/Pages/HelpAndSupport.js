import React, { useEffect, useState } from 'react'
import { LoadingTopBar } from '../Components/Loadingbar';
import { suggestionsGetApi } from '../Services/Apicalling/HelpAndSupport';
import PaginationButtons from '../Components/PaginationButtons';
import { OnlineStatusApiCalling } from '../Components/OfflineOnlineIndicator';
import Errordialog from '../Dialogs/Errordialog';
import { HelpAndSupportListLoader } from '../Components/Loaders/HelpAndSupportListLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { deleteIcon } from '../Assets/Index';

const HelpAndSupport = () => {
    const [progress, setProgress] = useState(80);
    const [page, setPage] = useState(1)
    const [helpSupport, setHelpSupport] = useState([])
    const [meta, setMeta] = useState({})
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogData, setErrorDialogData] = useState({})
    const [isLoading, setIsLoading] = useState(false);



    const fetchData = async () => {
        try {
            setIsLoading(true)
            const result = await suggestionsGetApi("query", page);
            if (result.data) {
                setHelpSupport(result.data.data.list);
                setMeta(result.data.data.meta);
                setIsLoading(false);
                setProgress(100);
            } else {
                setErrorDialogData(result.response.data);
                setErrorDialog(true);
            }
        } catch (error) {
            setErrorDialogData("Something went wrong");
            setErrorDialog(true);
        }
    };









    return (
        <>
            <LoadingTopBar Progress={progress} />
            <div className='my-2'>
                <h3> Help And Support</h3>
            </div>
            {errorDialog && <Errordialog errorDialogData={errorDialogData} />}
            <OnlineStatusApiCalling setIsLoading={setIsLoading} fetchData={fetchData} page={page} />


            <div>
                <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">
                    {helpSupport.map((e) => (
                        <div className="col rounded p-1 " >
                            <div className="card color p-2 px-3 h-100 ">
                                <div className='text-color'>
                                    <p className='m-0'><b>Title</b></p>
                                    <p>{e.title}</p>
                                    <p className='m-0'><b>Message</b></p>
                                    <p>{e.message}</p>
                                    <p><b>Date : </b>{new Date(e.created_at.split("T")[0]).toDateString()} </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>




            {isLoading ? (
                <HelpAndSupportListLoader />
            ) : (
                meta.total >= 11 && <PaginationButtons meta={meta} page={page} setPage={setPage} />
            )}

        </>
    )
}

export default HelpAndSupport