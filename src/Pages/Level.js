import React, { useState } from 'react'
import { LoadingTopBar } from '../Components/Loadingbar'

import { addIcon, deleteIcon, editIcon } from '../Assets/Index';
import AddLevel from '../Dialogs/LevelDialogs/AddLevel';
import EditLevel from '../Dialogs/LevelDialogs/EditLevel';
import { HelpAndSupportListLoader } from '../Components/Loaders/HelpAndSupportListLoader';
import { getLevelApi } from '../Services/Apicalling/LovelApi';
import { OnlineStatusApiCalling } from '../Components/OfflineOnlineIndicator';
import Errordialog from '../Dialogs/Errordialog';
import DeleteConfirmation from '../Dialogs/DeleteConfirmation';


const Level = () => {
    const [progress, setProgress] = useState(80);
    const [actionData, setActionData] = useState();
    const [levelList, setLevelList] = useState([])

    const [errorDialogData, setErrorDialogData] = useState({})
    const [errorDialog, setErrorDialog] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [addLevelDialog, setAddLevelDialog] = useState(false)
    const [editLevelDialog, setEditLevelDialog] = useState(false)
    const [deleteLevelDialog, setDeleteLevelDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)


    // Function to handle actions 
    const action = (type, data) => {
        setActionData(data)
        switch (type) {
            case 'add':
                setAddLevelDialog(true);
                break;
            case 'delete':
                setDeleteDialog(true);
                break;
            case 'edit':
                setEditLevelDialog(true);
                break;
            default:
                // Handle the default case if necessary
                break;
        }

    }

    // Function to fetch level data
    const fetchData = async () => {
        try {
            setIsLoading(true)
            const result = await getLevelApi();
            console.log({ result });
            if (result.data) {
                setLevelList(result.data.data)
                setProgress(100)
                setIsLoading(false)
            }
            else {
                setErrorDialog(true)
                setErrorDialogData(result.response.data)
            }
        } catch (error) {
            console.log({ error });
            setErrorDialog(true)
            setErrorDialogData("Something went wrong")
        }
    }

    return (
        <>
            <LoadingTopBar Progress={progress} />
            <div id='main' className='rounded border overflow-auto   h-100  '>
                <div className="w-100 px-1">
                    <div className='d-flex justify-content-between flex-wrap m-2'>
                        <h3>Level</h3>
                        <button type="button" className={`btn btn-outline-primary-emphasis rounded-3 text-color`} onClick={() => action("add")}>
                            <img src={addIcon} alt="add" className='me-1' />
                            Add Level </button>
                    </div>
                    <div>
                        {/* Component to handle online/offline status */}
                        <OnlineStatusApiCalling setIsLoading={setIsLoading} fetchData={fetchData} />
                        {/* Error dialog component */}
                        {errorDialog && <Errordialog errorDialogData={errorDialogData} />}
                        {/* Dialog components for actions */}
                        {addLevelDialog && <AddLevel setAddLevelDialog={setAddLevelDialog} fetchData={fetchData} />}
                        {editLevelDialog && <EditLevel setEditLevelDialog={setEditLevelDialog} actionData={actionData} fetchData={fetchData} />}
                        {deleteDialog && <DeleteConfirmation setDeleteDialog={setDeleteDialog} actionData={actionData} fetchData={fetchData} type={"level"} />}

                        <div className='mx-2 mx-sm-4'>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3 ">
                                {levelList.map((e) => (
                                    <div className="col rounded p-1 " >
                                        <div className="card text-color p-2 px-3 h-100 ">
                                            <div className='text-color'>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <p className='m-0'><b>Lever </b> {e.level}</p>
                                                    <div>
                                                        <button type="button" className={`btnlink rounded-3 p-1 me-2`} onClick={() => action("edit", e)}>
                                                            <img src={editIcon} alt="edit" />
                                                        </button>
                                                        <button type="button" className={`btnlink rounded-3 p-1 `} onClick={() => action("delete", e)}>
                                                            <img src={deleteIcon} alt="delete" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <p><b>Percentage</b> {e.percentage} %</p>
                                                <p className=' m-0'><b>Title</b></p>
                                                <p>{e.title}</p>
                                                <p className='m-0'><b> Created On :</b>{new Date(e.created_at.split("T")[0]).toDateString()} </p>
                                                <p className='m-0'><b> Updated On :</b>{new Date(e.updated_at.split("T")[0]).toDateString()} </p>
                                                {/* <p>{e.data}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                        {isLoading && <HelpAndSupportListLoader />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Level