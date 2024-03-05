import React, { useState } from 'react'
import { LoadingTopBar } from '../Components/Loadingbar'
import { actionIcon, addIcon, logo, template } from '../Assets/Index';
import AddTemplate from '../Dialogs/TemplateDialogs/AddTemplate';
import EditTemplate from '../Dialogs/TemplateDialogs/EditTemplate';
import { OnlineStatusApiCalling } from '../Components/OfflineOnlineIndicator';
import { getTemplateApi } from '../Services/Apicalling/TemplateApi';
import Errordialog from '../Dialogs/Errordialog';
import DeleteConfirmation from '../Dialogs/DeleteConfirmation';

const Template = () => {
    const [progress, setProgress] = useState(80);
    const [actionData, setActionData] = useState()
    const [addTemplateDialog, setAddTemplateDialog] = useState(false)
    const [deleteTemplateDialog, setDeleteTemplateDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [editTemplateDialog, setEditTemplateDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogData, setErrorDialogData] = useState({})

    const [templateDataList, setTemplateDataList] = useState([
        {
            id: 1,
            img: template,
            title: "1Lorem ipsum dolor sit amet consec giuguib",
            description: "Lorem ipsum dolor sit amet consec giuguib kjfkutetur "
        },
        {
            id: 2,
            img: template,
            title: "2 Lorem ipsum dolor sit amet consec giuguib",
            description: "Lorem ipsum dolor sit amet consec giuguib kjfkutetur"
        },
        {
            id: 3,
            img: template,
            title: "3 Lorem ipsum dolor sit amet consec giuguib",
            description: "Lorem ipsum dolor sit amet consec giuguib kjfkutetur"
        },
        {
            id: 4,
            img: template,
            title: "4 Lorem ipsum dolor sit amet consec giuguib",
            description: "Lorem ipsum dolor sit amet consec giuguib kjfkutetur"
        }
    ])

    // Function to handle different actions
    const action = (type, data) => {
        setActionData(data)
        switch (type) {
            case 'add':
                setAddTemplateDialog(true);
                break;
            case 'delete':
                setDeleteDialog(true);
                // setDeleteTemplateDialog(true);
                break;
            case 'edit':
                setEditTemplateDialog(true);
                break;
            default:
                // Handle the default case if necessary
                break;
        }

    }

    // Function to fetch template data
    const fetchData = async () => {
        try {
            setIsLoading(true)
            const result = await getTemplateApi();
            if (result.data) {
                setTemplateDataList(result.data.data)
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
    }


    return (
        <>
            <LoadingTopBar Progress={progress} />
            <div id='main' className='rounded border overflow-auto px-2  h-100  '>
                <div className="w-100 px-1">
                    <div className='my-2 d-flex justify-content-between'>
                        <h3>Template</h3>
                        <button type="button" onClick={() => action("add")} className={`btn btn-outline-primary-emphasis rounded-3 text-color`}>
                            <img src={addIcon} alt="add" className='me-1' />
                            Add Template </button>
                    </div>
                    {/* Error dialog component */}
                    {errorDialog && <Errordialog errorDialogData={errorDialogData} />}
                    {/* Component to handle online/offline status */}
                    {/* <OnlineStatusApiCalling setIsLoading={setIsLoading} fetchData={fetchData} /> */}
                    {/* Dialog components for actions */}
                    {addTemplateDialog && <AddTemplate setAddTemplateDialog={setAddTemplateDialog} fetchData={fetchData} />}
                    {editTemplateDialog && <EditTemplate setEditTemplateDialog={setEditTemplateDialog} actionData={actionData} fetchData={fetchData} />}
                    {deleteDialog && <DeleteConfirmation setDeleteDialog={setDeleteDialog} actionData={actionData} fetchData={fetchData} type={"template"} />}

                    <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 ">
                        {templateDataList.map((e) => (
                            <div className="col rounded p-1  " >
                                <div className="card text-color p-2 h-100">
                                    <div className='h-100'>
                                        <div className=' boder-color '>
                                            <img src={template} alt="logo" height={150} className=' w-100 rounded border object-fit-contain' />
                                        </div>
                                        <div >
                                            <p><b>{e.title} </b></p>
                                            <p className='m-0'><b>Description</b></p>
                                            <p>{e.description} </p>

                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <button type="button" onClick={() => action("delete", e)} className={`buttons w-50 mx-1`}>Delete </button>
                                        <button type="button" onClick={() => action("edit", e)} className={`buttons w-50 mx-1`}>Update </button>
                                    </div>
                                </div>
                            </div>


                        ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Template