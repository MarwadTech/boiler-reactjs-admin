import React, { useState } from 'react'
import { LoadingTopBar } from '../Components/Loadingbar'
import { RadioButton } from '../Dialogs/CommonDataDialogs/RadioButton'

const Dashboard = () => {
    const [progress, setProgress] = useState(100)
    // const [active, setActive] = useState('request');

    const labels = ["request", "track"];
    const [active, setActive] = useState("request");
    return (
        <>
            <LoadingTopBar Progress={progress} />
            <div className='my-2'>
                <h3>Dashboard</h3>
            </div>

            <div>

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

            </div>
        </>
    )
}

export default Dashboard