export const ReportsListLoader = () => {
    return (
        <>
            <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">
                {Array.from({ length: 12 }).map(() => (
                    <div className='col p-1' style={{ opacity: .2 }}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title m-0 w-75 placeholder" /><br />
                                <p className="card-text m-0 w-75 placeholder my-1" /><br />
                                <h5 className="card-text m-0 w-50 placeholder mt-3" /> <br />
                                <h5 className="card-text m-0 w-75 placeholder" /> <br />
                                <h5 className="card-text m-0 w-50 placeholder mt-3" /><br />
                                <h5 className="card-text m-0 w-100 placeholder" /> <br />
                                <h5 className="card-text m-0 w-100 placeholder" /> <br />
                                <div className="text-end mt-2">
                                    <p className='btn placeholder p-0 col-4 m-0 ' />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}