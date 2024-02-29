import React, { useState } from 'react'
import { LoadingTopBar } from '../Components/Loadingbar'

import { RadioButton } from '../Dialogs/CommonDataDialogs/RadioButton'
import { addIcon, deleteIcon, editIcon } from '../Assets/Index';
import AddLevel from '../Dialogs/LevelDialogs/AddLevel';
import EditLevel from '../Dialogs/LevelDialogs/EditLevel';
import DeleteLevel from '../Dialogs/LevelDialogs/DeleteLevel';
import { HelpAndSupportListLoader } from '../Components/Loaders/HelpAndSupportListLoader';


const Level = () => {
    const [progress, setProgress] = useState(80);
    const labels = ["request", "track"];
    const [active, setActive] = useState("request");
    const [addLevelDialog, setAddLevelDialog] = useState(false)
    const [editLevelDialog, setEditLevelDialog] = useState(false)
    const [deleteLevelDialog, setDeleteLevelDialog] = useState(false)
    const [activeData, setActiveData] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const [levelList, setLevelList] = useState([
        {
            "id": "750f45a86feb44aeb7c5b1f96e836308",
            "level": 1,
            "title": "1 Level",
            "percentage": 5,
            "created_at": "2023-12-01T13:48:30.000Z",
            "updated_at": "2023-12-01T13:48:30.000Z"
        },
        {
            "id": "90a55d3d66734624af77ce1b48e7a9aa",
            "level": 2,
            "title": "2 Level",
            "percentage": 10,
            "created_at": "2023-12-01T13:51:10.000Z",
            "updated_at": "2023-12-01T13:51:10.000Z"
        },
        {
            "id": "750f45a86feb44aeb7c5b1f96e836308",
            "level": 3,
            "title": "3 Level",
            "percentage": 14,
            "created_at": "2023-12-01T13:48:30.000Z",
            "updated_at": "2023-12-01T13:48:30.000Z"
        },
        {
            "id": "90a55d3d66734624af77ce1b48e7a9aa",
            "level": 4,
            "title": "4 Level",
            "percentage": 19,
            "created_at": "2023-12-01T13:51:10.000Z",
            "updated_at": "2023-12-01T13:51:10.000Z"
        },
        {
            "id": "750f45a86feb44aeb7c5b1f96e836308",
            "level": 5,
            "title": "5 Level",
            "percentage": 32,
            "created_at": "2023-12-01T13:48:30.000Z",
            "updated_at": "2023-12-01T13:48:30.000Z"
        },
        {
            "id": "90a55d3d66734624af77ce1b48e7a9aa",
            "level": 6,
            "title": "6 Level",
            "percentage": 17,
            "created_at": "2023-12-01T13:51:10.000Z",
            "updated_at": "2023-12-01T13:51:10.000Z"
        }, {
            "id": "750f45a86feb44aeb7c5b1f96e836308",
            "level": 1,
            "title": "1 Level",
            "percentage": 5,
            "created_at": "2023-12-01T13:48:30.000Z",
            "updated_at": "2023-12-01T13:48:30.000Z"
        },
        {
            "id": "90a55d3d66734624af77ce1b48e7a9aa",
            "level": 2,
            "title": "2 Level",
            "percentage": 10,
            "created_at": "2023-12-01T13:51:10.000Z",
            "updated_at": "2023-12-01T13:51:10.000Z"
        },
        {
            "id": "750f45a86feb44aeb7c5b1f96e836308",
            "level": 3,
            "title": "3 Level",
            "percentage": 14,
            "created_at": "2023-12-01T13:48:30.000Z",
            "updated_at": "2023-12-01T13:48:30.000Z"
        },
        {
            "id": "90a55d3d66734624af77ce1b48e7a9aa",
            "level": 4,
            "title": "4 Level",
            "percentage": 19,
            "created_at": "2023-12-01T13:51:10.000Z",
            "updated_at": "2023-12-01T13:51:10.000Z"
        },
        {
            "id": "750f45a86feb44aeb7c5b1f96e836308",
            "level": 5,
            "title": "5 Level",
            "percentage": 32,
            "created_at": "2023-12-01T13:48:30.000Z",
            "updated_at": "2023-12-01T13:48:30.000Z"
        },
        {
            "id": "90a55d3d66734624af77ce1b48e7a9aa",
            "level": 6,
            "title": "6 Level",
            "percentage": 17,
            "created_at": "2023-12-01T13:51:10.000Z",
            "updated_at": "2023-12-01T13:51:10.000Z"
        }
    ],)


    const editLevel = (data) => {
        setEditLevelDialog(true)
        setActiveData(data)

    }
    const deleteLevel = (data) => {
        setDeleteLevelDialog(true)
        setActiveData(data)

    }

    const fetchData = () => {
        setIsLoading(true)
    }

    return (
        <>
            <LoadingTopBar Progress={progress} />
            <div className='d-flex justify-content-between flex-wrap my-2'>
                <h3>Level</h3>
                <button type="button" className={`btn btn-outline-primary-emphasis rounded-3 text-color`} onClick={() => setAddLevelDialog(true)}>
                    <img src={addIcon} alt="add" className='me-1' />
                    Level </button>
            </div>
            <div>


                {addLevelDialog && <AddLevel setAddLevelDialog={setAddLevelDialog} />}
                {editLevelDialog && <EditLevel setEditLevelDialog={setEditLevelDialog} activeData={activeData} />}
                {deleteLevelDialog && <DeleteLevel setDeleteLevelDialog={setDeleteLevelDialog} activeData={activeData} />}

                <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">
                    {levelList.map((e) => (
                        <div className="col rounded p-1 " >
                            <div className="card color p-2 px-3 h-100 ">
                                <div className='text-color'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className='m-0'><b>Lever </b> {e.level}</p>
                                        <div>
                                            <button type="button" className={`btnlink rounded-3 p-1 me-2`} onClick={() => editLevel(e)}>
                                                <img src={editIcon} alt="edit" />
                                            </button>
                                            <button type="button" className={`btnlink rounded-3 p-1 `} onClick={() => deleteLevel(e)}>
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








                <div className="d-flex redio-button m-auto text-center my-4">
                    {labels.map((label) => (
                        <RadioButton
                            key={label}
                            active={active} // Pass active state to each RadioButton
                            setActive={setActive} // Pass setActive function to each RadioButton
                            label={label} // Pass label to each RadioButton
                        />
                    ))}
                </div>
                <p>{active}</p>




                {isLoading && <HelpAndSupportListLoader />}

            </div>

        </>
    )
}

export default Level