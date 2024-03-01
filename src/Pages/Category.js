import React, { useEffect, useState } from 'react'
import { LoadingTopBar } from '../Components/Loadingbar'
import { addIcon, deleteIcon, editIcon } from '../Assets/Index';
import AddCategoryData from '../Dialogs/CategoryDataDialogs/AddCategoryData';
import EditCategoryData from '../Dialogs/CategoryDataDialogs/EditCategoryData';
import DeleteCategoryData from '../Dialogs/CategoryDataDialogs/DeleteCategoryData';
import Errordialog from '../Dialogs/Errordialog';
import { categoryGetApi } from '../Services/Apicalling/CategoryApi';
import { OnlineStatusApiCalling } from '../Components/OfflineOnlineIndicator';

const Category = () => {
    const [progress, setProgress] = useState(80);
    const [isLoading, setIsLoading] = useState(true);

    const [actionData, setActionData] = useState()
    const [addCategoryDialog, setAddCategoryDialog] = useState(false)
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false)
    const [editCategoryDialog, setEditCategoryDialog] = useState(false)

    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogData, setErrorDialogData] = useState({})

    const [categoryList, setCategoryList] = useState([])

    const [categoryListdu, setCategoryListdu] = useState([
        {
            "id": "750f45a86feb44aeb7c5b1f96e836308",
            "name": "name1",
            "created_at": "2023-12-01T13:48:30.000Z",
            "updated_at": "2023-12-01T13:48:30.000Z"
        },
        {
            "id": "90a55d3d66734624af77ce1b48e7a9aa",
            "name": "name2",
            "created_at": "2023-12-01T13:51:10.000Z",
            "updated_at": "2023-12-01T13:51:10.000Z"
        },
        {
            "id": "750f45a86feb44aeb7c5b1f96e836308",
            "name": "name3",
            "created_at": "2023-12-01T13:48:30.000Z",
            "updated_at": "2023-12-01T13:48:30.000Z"
        },
        {
            "id": "90a55d3d66734624af77ce1b48e7a9aa",
            "name": "name4",
            "created_at": "2023-12-01T13:51:10.000Z",
            "updated_at": "2023-12-01T13:51:10.000Z"
        },
        {
            "id": "750f45a86feb44aeb7c5b1f96e836308",
            "name": "name4",
            "created_at": "2023-12-01T13:48:30.000Z",
            "updated_at": "2023-12-01T13:48:30.000Z"
        },
        {
            "id": "90a55d3d66734624af77ce1b48e7a9aa",
            "name": "name6",
            "created_at": "2023-12-01T13:51:10.000Z",
            "updated_at": "2023-12-01T13:51:10.000Z"
        }, {
            "id": "750f45a86feb44aeb7c5b1f96e836308",
            "name": "name7",
            "created_at": "2023-12-01T13:48:30.000Z",
            "updated_at": "2023-12-01T13:48:30.000Z"
        },
    ],)


    const action = (type, data) => {
        setActionData(data)
        switch (type) {
            case 'add':
                setAddCategoryDialog(true);
                break;
            case 'delete':
                setDeleteCategoryDialog(true);
                break;
            case 'edit':
                setEditCategoryDialog(true);
                break;
            default:
                // Handle the default case if necessary
                break;
        }

    }

    const fetchData = async () => {
        try {
            setIsLoading(true)
            const result = await categoryGetApi();
            if (result.data) {
                setCategoryList(result.data)
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

    // useEffect(() => { fetchData() }, [])

    return (
        <>
            <LoadingTopBar Progress={progress} />
            <div className='d-flex justify-content-between flex-wrap my-2'>
                <h3>Category</h3>
                <button type="button" onClick={() => action("add")} className={`btn btn-outline-primary-emphasis rounded-3 text-color`}>
                    <img src={addIcon} alt="add" className='me-1' />
                    Add Category </button>
            </div>
            {/* <OnlineStatusApiCalling setIsLoading={setIsLoading} fetchData={fetchData} /> */}
            {errorDialog && <Errordialog errorDialogData={errorDialogData} />}
            {addCategoryDialog && <AddCategoryData setAddCategoryDialog={setAddCategoryDialog} />}
            {editCategoryDialog && <EditCategoryData setEditCategoryDialog={setEditCategoryDialog} actionData={actionData} fetchData={fetchData} />}
            {deleteCategoryDialog && <DeleteCategoryData setDeleteCategoryDialog={setDeleteCategoryDialog} actionData={actionData} fetchData={fetchData} />}

            <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">
                {categoryListdu.map((e) => (
                    <div className="col rounded p-1 " >
                        <div className="card color p-2 px-3 h-100 ">
                            <div className='text-color'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className='m-0'><b>Name</b></p>
                                    <div>
                                        <button type="button" className={`btnlink rounded-3 p-1 me-2`} onClick={() => action("edit", e)}>
                                            <img src={editIcon} alt="edit" />
                                        </button>
                                        <button type="button" className={`btnlink rounded-3 p-1 `} onClick={() => action("delete", e)}>
                                            <img src={deleteIcon} alt="delete" />
                                        </button>
                                    </div>
                                </div>
                                <p> {e.name} </p>
                                <p className='m-0'><b> Created On :</b>{new Date(e.created_at.split("T")[0]).toDateString()} </p>
                                <p className='m-0'><b> Updated On :</b>{new Date(e.updated_at.split("T")[0]).toDateString()} </p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>






        </>
    )
}

export default Category