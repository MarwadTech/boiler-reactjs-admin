import React, { useState } from 'react'
import { LoadingTopBar } from '../Components/Loadingbar'
import { actionIcon, addIcon, logo, template } from '../Assets/Index';
import AddTemplate from '../Dialogs/TemplateDataDialogs/AddTemplate';
import EditTemplate from '../Dialogs/TemplateDataDialogs/EditTemplate';
import DeleteTemplate from '../Dialogs/TemplateDataDialogs/DeleteTemplate';
import { OnlineStatusApiCalling } from '../Components/OfflineOnlineIndicator';
import { templateGetApi } from '../Services/Apicalling/TemplateApi';
import Errordialog from '../Dialogs/Errordialog';

const Template = () => {
    const [progress, setProgress] = useState(80);
    const [actionData, setActionData] = useState()
    const [addTemplateDialog, setAddTemplateDialog] = useState(false)
    const [deleteTemplateDialog, setDeleteTemplateDialog] = useState(false)
    const [editTemplateDialog, setEditTemplateDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogData, setErrorDialogData] = useState({})

    const [templateDataList, setTemplateDataList] = useState([
        {
            img: template,
            title: "1Lorem ipsum dolor sit amet consec giuguib",
            description: "Lorem ipsum dolor sit amet consec giuguib kjfkutetur"
        },
        {
            img: template,
            title: "2 Lorem ipsum dolor sit amet consec giuguib",
            description: "Lorem ipsum dolor sit amet consec giuguib kjfkutetur"
        },
        {
            img: template,
            title: "3 Lorem ipsum dolor sit amet consec giuguib",
            description: "Lorem ipsum dolor sit amet consec giuguib kjfkutetur"
        },
        {
            img: template,
            title: "4 Lorem ipsum dolor sit amet consec giuguib",
            description: "Lorem ipsum dolor sit amet consec giuguib kjfkutetur"
        }
    ])

    const action = (type, data) => {
        setActionData(data)
        switch (type) {
            case 'add':
                setAddTemplateDialog(true);
                break;
            case 'delete':
                setDeleteTemplateDialog(true);
                break;
            case 'edit':
                setEditTemplateDialog(true);
                break;
            default:
                // Handle the default case if necessary
                break;
        }

    }

    const fetchData = async () => {
        try {
            setIsLoading(true)
            const result = await templateGetApi();
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
            <div className='my-2 d-flex justify-content-between flex-wrap'>
                <h3>Template</h3>
                <button type="button" onClick={() => action("add")} className={`btn btn-outline-primary-emphasis rounded-3 text-color`}>
                    <img src={addIcon} alt="add" className='me-1' />
                    Add Template </button>
            </div>
            {errorDialog && <Errordialog errorDialogData={errorDialogData} />}
            {/* <OnlineStatusApiCalling setIsLoading={setIsLoading} fetchData={fetchData} /> */}
            {addTemplateDialog && <AddTemplate setAddTemplateDialog={setAddTemplateDialog} fetchData={fetchData} />}
            {editTemplateDialog && <EditTemplate setEditTemplateDialog={setEditTemplateDialog} actionData={actionData} fetchData={fetchData} />}
            {deleteTemplateDialog && <DeleteTemplate setDeleteTemplateDialog={setDeleteTemplateDialog} actionData={actionData} fetchData={fetchData} />}

            <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-3  row-cols-xl-4">
                {templateDataList.map((e) => (
                    <div className="col rounded p-1  " >
                        <div className="card text-color p-2 h-100">
                            <div className=' boder-color position-relative'>
                                <img src={e.img} alt="" className='w-100 rounded' />

                            </div>
                            <div >
                                <p><b>{e.title} </b></p>
                                <p className='m-0'><b>Description</b></p>
                                <p>{e.description} </p>

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

        </>
    )
}

export default Template