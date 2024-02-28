export const NotificationListLoader = () => {
    return (
        <>
            <div className="row m-sm-1 row-cols-1 row-cols-sm-1 row-cols-md-2  row-cols-xl-3" >
                {Array.from({ length: 9 }).map((_, index) => (
                    <div className='col' style={{ opacity: 0.2 }}>
                        <div className="card   \my-2 ">
                            <div className="card-body">
                                <div className=" h-100 placeholder-wave d-flex align-items-center mb-1">
                                    <img className="card-img-top placeholder rounded float-start" style={{
                                        width: '100px', aspectRatio: '1 / 1'
                                    }} />
                                    <div className=' h-100 w-100 my-auto placeholder-wave float-start ms-2'>
                                        <h5 className="card-title m-0  w-50 placeholder" />
                                        <p className="card-text m-0  w-100 placeholder my-1" />
                                        <div className='d-flex justify-content-between  placeholder-wave'>
                                            <span className="card-text m-0  w-25 placeholder" />
                                            <span className="card-text m-0  w-25 placeholder" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h5 className=" m-0  w-25 placeholder " />
                                    <p className=" m-0  w-100 placeholder" />
                                    <p className=" m-0  w-100 placeholder" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}