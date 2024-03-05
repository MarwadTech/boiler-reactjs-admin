import React, { useState } from 'react';
import { deleteApiWithId } from '../Services/Apicalling/CommonApi';
import TorshMessage from '../Components/TorshMessage';

const DeleteConfirmation = ({ setDeleteDialog, actionData, fetchData, type }) => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [torsh, setTorsh] = useState(false);

    // Function to handle deletion
    const handleDelete = async () => {
        try {
            const deleteApi = await deleteApiWithId(actionData, type);
            console.log({ deleteApi });
            if (deleteApi.data) {
                setTorsh(true);
                setMessage(deleteApi.data.message);
                setTimeout(() => {
                    setDeleteDialog();
                    fetchData();
                }, 500);
            } else {
                if (deleteApi.response.data.errors) {
                    setError(true);
                    setMessage(deleteApi.response.data.errors[0].message);
                } else {
                    setTorsh(true);
                    setMessage(deleteApi.response.data.message);
                }
            }
        } catch (error) {
            console.log({ error });
            setError(true);
            setMessage("Something went wrong");
        }
    };

    // Function to render field with name and value
    const renderField = (fieldName, fieldValue) => (
        <div>
            <b>{fieldName}</b>
            <p className='flex-wrap overflow-x-scroll'>{fieldValue}</p>
        </div>
    );

    return (
        <>
            {/* TorshMessage component for displaying messages */}
            <TorshMessage error={error} message={message} torsh={torsh} setTorsh={setTorsh} />
            <div className={`d-flex justify-content-center align-items-center bg-opacity-75 h-100 w-100 position-fixed start-0 top-0 z-2 bg-white`}>
                <div className={`px-4 py-3 shadow rounded w-300 bg-white text-color border-color`}>
                    <h4>Delete {type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                    <p>Are you sure?</p>

                    {/* user */}
                    {type === "user" && renderField("Full Name", actionData.full_name)}
                    {type === "user" && renderField("Phone Number", actionData.phone_number)}

                    {/* level */}
                    {type === "level" && renderField("Level", actionData.level)}
                    {type === "level" && <p><b>Percentage : </b>{actionData.percentage}</p>}
                    {type === "level" && renderField("Title", actionData.title)}

                    {/* category */}
                    {type === "category" && renderField("Name", actionData.name)}

                    {/* template */}
                    {type === "template" && <img src={actionData.img} alt="template" height={150} className='w-100 rounded object-fit-contain border' />}
                    {type === "template" && renderField("Title", actionData.title)}
                    {type === "template" && renderField("Description", actionData.description)}

                    {/* commondata */}
                    {type === "commondata" && renderField("Key", actionData.key)}
                    {type === "commondata" && renderField("Data", actionData.data)}

                    <p className='mt-2'>is Deleted</p>
                    {/* <p className={`${error ? 'text-danger' : 'text-success'}`}>{message}</p> */}

                    {/* Confirmation buttons */}
                    <div className='d-flex justify-content-end'>
                        <button className={`btn btn-outline-primary-emphasis me-3 text-color`} onClick={() => setDeleteDialog()}>NO</button>
                        <button className="buttons" onClick={() => handleDelete()}>YES</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteConfirmation;
