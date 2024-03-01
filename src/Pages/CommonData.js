import React, { useState } from 'react'
import { addIcon, deleteIcon, editIcon, logo } from '../Assets/Index';
import { LoadingTopBar } from '../Components/Loadingbar';
import Addcommondata from '../Dialogs/CommonDataDialogs/AddCommonData';
import Deletecommondata from '../Dialogs/CommonDataDialogs/DeleteCommonData';
import Editcommondata from '../Dialogs/CommonDataDialogs/EditCommonData';
import Errordialog from '../Dialogs/Errordialog';
import { OnlineStatusApiCalling } from '../Components/OfflineOnlineIndicator';
import { commonDataGetApi } from '../Services/Apicalling/CommonDataApi';
import { HelpAndSupportListLoader } from '../Components/Loaders/HelpAndSupportListLoader';
const Commondata = () => {
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogData, setErrorDialogData] = useState({})
    const [progress, setProgress] = useState(80);
    const [commonDataList, setCommonDataList] = useState([])
    const [commonData, setCommonData] = useState()
    const [addCommonDataDialog, setAddCommonDataDialog] = useState(false);
    const [deleteCommonDataDialog, setDeleteCommonDataDialog] = useState(false);
    const [editCommonDataDialog, setEditCommonDataDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const [actionData, setActionData] = useState();



    const action = (type, data) => {
        setActionData(data)
        switch (type) {
            case 'add':
                setAddCommonDataDialog(true);
                break;
            case 'delete':
                setDeleteCommonDataDialog(true);
                break;
            case 'edit':
                setEditCommonDataDialog(true);
                break;
            default:
                // Handle the default case if necessary
                break;
        }

    }










    const fetchData = async () => {
        try {
            setIsLoading(true)
            const result = await commonDataGetApi();
            if (result.data) {
                setCommonDataList(result.data.data)
                setProgress(100)
                setIsLoading(false)
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
            <div className='d-flex justify-content-between flex-wrap my-2'>
                <h3> Common Data</h3>
                <button type="button" onClick={() => action("add")} className={`btn btn-outline-primary-emphasis rounded-3 text-color`}>
                    <img src={addIcon} alt="add" className='me-1' />
                    Add </button>
            </div>

            <OnlineStatusApiCalling setIsLoading={setIsLoading} fetchData={fetchData} />
            {errorDialog && <Errordialog errorDialogData={errorDialogData} />}
            {addCommonDataDialog && <Addcommondata setAddCommonDataDialog={setAddCommonDataDialog} fetchData={fetchData} />}
            {deleteCommonDataDialog && <Deletecommondata setDeleteCommonDataDialog={setDeleteCommonDataDialog} actionData={actionData} fetchData={fetchData} />}
            {editCommonDataDialog && <Editcommondata setEditCommonDataDialog={setEditCommonDataDialog} actionData={actionData} fetchData={fetchData} />}
            <div>
                <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">
                    {commonDataList.map((e) => (
                        <div className="col rounded p-1 " >
                            <div className="card color p-2 px-3 h-100 ">
                                <div className='text-color'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className='m-0'><b>Key</b></p>
                                        <div>
                                            <button type="button" className={`btnlink rounded-3 p-1 me-2`} onClick={() => action("edit", e)}>
                                                <img src={editIcon} alt="edit" />
                                            </button>
                                            <button type="button" className={`btnlink rounded-3 p-1 `} onClick={() => action("delete", e)} >
                                                <img src={deleteIcon} alt="delete" />
                                            </button>
                                        </div>
                                    </div>
                                    <p>{e.key}</p>
                                    <p className='m-0'><b>Data</b></p>
                                    <p>{e.data}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                {isLoading && <HelpAndSupportListLoader />}
            </div >
        </>
    )
}

export default Commondata