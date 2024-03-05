import React, { useState } from 'react'
import { LoadingTopBar } from '../Components/Loadingbar';
import Errordialog from '../Dialogs/Errordialog';
import { OnlineStatusApiCalling } from '../Components/OfflineOnlineIndicator';
import { getReportApi } from '../Services/Apicalling/ReportsApi';
import PaginationButtons from '../Components/PaginationButtons';
import { ReportsListLoader } from '../Components/Loaders/ReportsListLoader';

const Reports = () => {
    const [progress, setProgress] = useState(80);
    const [page, setPage] = useState(1);
    const [reportList, setReportList] = useState([]);
    const [meta, setMeta] = useState({});
    const [errorDialogData, setErrorDialogData] = useState({})
    const [errorDialog, setErrorDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    // Function to fetch reports data
    const fetchData = async () => {
        try {
            setIsLoading(true)
            const result = await getReportApi(page);
            if (result.data) {
                setReportList(result.data.data.list)
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
            <div id='main' className='rounded border overflow-auto px-2  h-100  '>
                <div className="w-100 px-1">
                    <div className='my-2'>
                        <h3>Reports</h3>
                    </div>
                    {/* Error dialog component */}
                    {errorDialog && <Errordialog errorDialogData={errorDialogData} />}
                    {/* Component to handle online/offline status */}
                    {/* <OnlineStatusApiCalling setIsLoading={setIsLoading} fetchData={fetchData} page={page} /> */}

                    <div>
                        <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">
                            <div className="col rounded p-1 " >
                                <div className="card text-color p-2 px-3 h-100">
                                    <div className='text-color h-100'>
                                        <p className='m-0'><b>Name : </b>chandra prakash</p>
                                        <p className='m-0 my-1'><b>Phone Number : </b>1234567890</p>
                                        <p className='m-0 '><b>Model : </b>login</p>
                                        <p><b>Created On : </b>Tue Mar 05 2024</p>
                                        <p className='m-0'><b>Description</b></p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, ab.</p>
                                    </div>
                                    <div className='text-end'>
                                        <button className='buttons py-0 '> View More</button>
                                    </div>
                                </div>
                            </div>
                            {reportList.map((e) => (
                                <div className="col rounded p-1 " >
                                    <div className="card text-color p-2 px-3 h-100">
                                        <div className='text-color h-100'>
                                            <p className='m-0'><b>Name : </b>{e.user.full_name}</p>
                                            <p className='m-0 my-1'><b>Phone Number : </b>{e.user.phone_number}</p>
                                            <p className='m-0 '><b>Model : </b>{e.model}</p>
                                            <p><b>Created On : </b>{new Date(e.created_at.split("T")[0]).toDateString()} </p>
                                            <p className='m-0'><b>Description</b></p>
                                            <p>{e.description}</p>
                                        </div>
                                        <div className='text-end'>
                                            <button className='buttons py-0 '> View More</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {isLoading ? (
                            <ReportsListLoader />
                        ) : (
                            meta.total >= 11 && <PaginationButtons meta={meta} page={page} setPage={setPage} />
                        )}

                    </div>
                </div>
            </div>

        </>
    )
}

export default Reports