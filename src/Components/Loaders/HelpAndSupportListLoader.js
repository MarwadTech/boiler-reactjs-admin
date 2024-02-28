export const HelpAndSupportListLoader = () => {
    return (
        <>
            <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">
                {Array.from({ length: 12 }).map(() => (

                    <div className='col p-1' style={{ opacity: .2 }}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title m-0  w-25 placeholder" /><br />
                                <p className="card-text m-0  w-50 placeholder my-1 " /><br />
                                <h5 className="card-text m-0  w-25 placeholder mt-3" /> <br />
                                <h5 className="card-text m-0  w-100 placeholder" /> <br />
                                <h5 className="card-text m-0  w-50 placeholder mt-3" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}