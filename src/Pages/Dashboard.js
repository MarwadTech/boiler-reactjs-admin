import React, { useState } from 'react'
import { LoadingTopBar } from '../Components/Loadingbar'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { colorCode, colorCode2, colorCode3, colorCode4, colorCode5, logo } from '../Assets/Index';
import Chart from 'react-google-charts';
import { StarRat } from '../Components/FiveStar';
import CountUp from 'react-countup/';


const Dashboard = () => {
    const [progress, setProgress] = useState(100)

    const [total, setTotal] = useState(200)

    const cardData = [
        { label: "Today", data: 40 },
        { label: "This week", data: 50 },
        { label: "This month", data: 20 },
        { label: "Lest month", data: 20 },
        { label: "This year", data: 85 },
        { label: "lest year", data: 85 },
    ]

    const commonOptions = {
        // pieHole: 0.9,
        // is3D: true,
        slices: [
            { color: colorCode, offset: 0.03 },
            { color: colorCode, offset: 0.03 },
            { color: colorCode3, offset: 0.03 },
            { color: colorCode3, offset: 0.03 },
            { color: colorCode5, offset: 0.03 },
        ],

    };

    const requestsdata = [
        ["requests", "status"],
        ["pending", 10],
        ["inprogress", 50],
        ["completed", 80],

    ];
    const ordersdata = [
        ["orders", "status"],
        ["pending", 5],
        ["inprogress", 9],
        ["completed", 5],
        ["rejected", 40],

    ];


    const ratingdata = [
        { value: 5, bgcolor: colorCode, count: 50 },
        { value: 4, bgcolor: colorCode2, count: 90 },
        { value: 3, bgcolor: colorCode3, count: 30 },
        { value: 2, bgcolor: colorCode4, count: 20 },
        { value: 1, bgcolor: colorCode5, count: 10 }
    ];


    return (
        <>
            <LoadingTopBar Progress={progress} />
            <div className='my-2'>
                <h3>Dashboard</h3>
            </div>

            <div>
                <div>
                    <h4>Join User<span style={{ fontSize: '18px' }}> <CountUp start={0} duration={1} end={total} /></span></h4>
                    <div className="row  row-cols-3 row-cols-sm-4 row-cols-md-6 row-cols-lg-6">
                        {cardData.map((cardData, index) => (
                            <Card key={index} label={cardData.label} data={cardData.data} total={total} />
                        ))}
                    </div>
                </div>




                <div>
                    <div className="row  row-cols-1 row-cols-sm-2 row-cols-md-3">
                        <div className="col rounded p-1  " >
                            {/* requests */}
                            <div className="card text-color p-3  h-100">
                                <h5>Orders Requests</h5>
                                <Chart
                                    chartType="PieChart"
                                    width="100%"
                                    height="100%"
                                    data={requestsdata}
                                    options={{ ...commonOptions, total: total }}
                                />
                            </div>
                        </div>

                        <div className="col rounded p-1  " >
                            {/* ordersoptions */}
                            <div className="card text-color p-3 h-100 ">
                                <h5>Orders Track</h5>
                                <Chart
                                    chartType="PieChart"
                                    width="100%"
                                    height="100%"
                                    data={ordersdata}
                                    options={{ ...commonOptions, total: total }}
                                />
                            </div>
                        </div>
                        <div className="col rounded p-1" >
                            <div className="card color p-2 py-4 h-100 text-center">
                                <h5>Overall Feed Back</h5>
                                <h5>{4.5}</h5>
                                <p className='m-0'>Number of count sent feed back user</p>
                                <div className='overflow-x-scroll d-flex flex-wrap  w-75 mx-auto my-2'>
                                    <style> {`::-webkit-scrollbar {height: 1px}`}</style>
                                    <p className=' m-auto' >{total || "0"}</p>
                                </div>
                                <StarRat rat={4} starDimension="30px" starSpacing="10px" />
                                <div className='my-1'>
                                    {ratingdata.map(({ value, bgcolor, count }) => (
                                        <Addrating key={value} value={value} bgcolor={bgcolor} count={count} received={total} />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>



                <div className='my-1'>
                    <h5 className=' m-0'>Popular</h5>
                    <div className='rounded d-flex overflow-x-auto w-100'>

                        {Array.from({ length: 10 }).map(() => (
                            <div className='border rounded p-2 m-1 mw-300' >
                                <div className='d-flex'>
                                    <div className='me-1 '>
                                        <img src={logo} alt="..." width={80} height={80} className='rounded single-border-color' />
                                    </div>
                                    <div>
                                        <p>4.5 (2548)</p>
                                        <p>15240 learner</p>
                                    </div>
                                </div>
                                <p className='m-0'>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet..</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='my-1'>
                    <h5 className=' m-0'> Top Ratings</h5>
                    <div className='rounded d-flex overflow-x-auto w-100'>
                        {Array.from({ length: 10 }).map(() => (
                            <div className='border rounded p-2 m-1 mw-300' >
                                <div className='d-flex'>
                                    <div className='me-1'>
                                        <img src={logo} alt="" width={80} height={80} className='rounded single-border-color' />
                                    </div>
                                    <div>
                                        <p>4.5 (2548)</p>
                                        <p>15240 learner</p>
                                    </div>
                                </div>
                                <p className='m-0'>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet..</p>
                            </div>
                        ))}
                    </div>
                </div>



























            </div>
        </>
    )
}

export default Dashboard

const Card = ({ label, data, total }) => {
    const percentage = (data && total) ? ((data / total) * 100).toFixed(0) : 0;
    return (
        <div className="col rounded p-1  " >
            <div className="card text-color border-color p-2 text-center h-100 ">
                <p className='m-2'> <b>{label.charAt(0).toUpperCase() + label.slice(1)}</b></p>
                <div className='m-auto  d-flex justify-content-center align-items-center' style={{ width: '80px' }}>
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={buildStyles({
                            textSize: '20px',
                            pathColor: colorCode,
                            textColor: colorCode,
                            trailColor: '#80808030',
                        })}
                    />
                </div>
                <div className='overflow-x-scroll d-flex flex-wrap '>
                    <style> {`::-webkit-scrollbar {height: 1px}`}</style>
                    <p className='m-0 mt-1 m-auto' >{data || "0"}</p>
                </div>
            </div>
        </div>
    )
}


const Addrating = ({ value, bgcolor, count, received }) => {
    const percentage = (count && received) ? ((count / received) * 100).toFixed(0) : 0;
    return <div className=' d-flex justify-content-around  w-75 m-auto my-1'>

        <p className='m-0'>{value}</p>
        <div className="progress m-2 w-100" role="progressbar" aria-label="Example 1px high" style={{ height: 11, borderRadius: "3px" }}>
            <div className="progress-bar" style={{
                width: `${((count / received) * 100).toFixed(0)}%`, backgroundColor: bgcolor
            }} />
        </div>
        <p className='m-0'>{percentage}%</p>
    </div>;
}