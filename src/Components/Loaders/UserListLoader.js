export const UserListLoader = () => {
    return (
        <>
            <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">
                {Array.from({ length: 12 }).map(() => (

                    <div className='col p-1' style={{ opacity: .2 }}>
                        <div className="card  ">
                            <div className="card-body">
                                <div className=" h-100 placeholder-wave d-flex align-items-center mb-3">
                                    <img className="card-img-top placeholder rounded float-start" style={{
                                        width: '100px', aspectRatio: '1 / 1'
                                    }} />
                                    <div className=' h-100 w-100 my-auto placeholder-wave float-start ms-2'>
                                        <h5 className="card-title m-0  w-50 placeholder" />
                                        <p className="card-text m-0  w-100 placeholder my-1" />
                                        <p className="card-text m-0  w-100 placeholder" />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between px-4 placeholder-wave'>
                                    <p className='btn placeholder p-1 col-2 m-0 ' />
                                    <p className='btn placeholder p-1 col-2 m-0' />
                                    <p className='btn placeholder p-1 col-2 m-0' />
                                    <p className='btn placeholder p-1 col-2 m-0 ' />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}