import React, { useEffect, useState } from 'react'
import { LoadingTopBar } from '../Components/Loadingbar';
import { getQueriesApi } from '../Services/Apicalling/HelpAndSupport';
import PaginationButtons from '../Components/PaginationButtons';
import { OnlineStatusApiCalling } from '../Components/OfflineOnlineIndicator';
import Errordialog from '../Dialogs/Errordialog';
import { HelpAndSupportListLoader } from '../Components/Loaders/HelpAndSupportListLoader';
import { useNavigate } from 'react-router-dom';

const HelpAndSupport = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(80);
    const [page, setPage] = useState(1)
    const [helpSupport, setHelpSupport] = useState([])
    const [meta, setMeta] = useState({})
    const [errorDialogData, setErrorDialogData] = useState({})
    const [errorDialog, setErrorDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false);


    // Function to fetch help and support suggestions
    const fetchData = async () => {
        try {
            setIsLoading(true)
            const result = await getQueriesApi(page);

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
            <div id='main' className='rounded border overflow-auto px-2  h-100  '>
                <div className="w-100 px-1">
                    <div className='my-2'>
                        <h3> Help And Support</h3>
                    </div>
                    {/* Component to handle online/offline status */}
                    <OnlineStatusApiCalling setIsLoading={setIsLoading} fetchData={fetchData} page={page} />
                    {/* Error dialog component */}
                    {errorDialog && <Errordialog errorDialogData={errorDialogData} />}


                    <div>
                        <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">
                            {helpSupport.map((e) => (
                                <div className="col rounded p-1 " >
                                    <div className="card text-color p-2 px-3 h-100 ">
                                        <div className='text-color h-100' >
                                            <p className=''><b>Name : </b> {e.user.name}</p>
                                            <p className=''><b>Number : </b> {e.user.phone_number}</p>
                                            <p className=''><b>Email : </b> {e.user.email}</p>
                                            <p className=''><b>Category : </b> {e.category}</p>
                                            <p className='m-0'><b>Message</b></p>
                                            <p>{e.query}</p>
                                            <p><b>Date : </b>{new Date(e.created_at.split("T")[0]).toDateString()} </p>
                                        </div>
                                        <div className='text-end'>
                                            <button className='buttons py-0 ' onClick={() => navigate(`/userdetails/${e.user.id}`)}> View User</button>
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

                </div>
            </div>
        </>
    )
}

export default HelpAndSupport