export const CommonData = () => {
    return (
        <div className="row m-sm-1 row-cols-1 row-cols-sm-2 row-cols-md-2  row-cols-xl-3">

            <div className="col rounded p-1 " >
                <div className="card p-2 px-3 h-100 ">
                    <div className='text-color'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='placeholder' />
                            <div>
                                <button type="button" className={`btnlink rounded-3 p-1 me-2`} />
                                <button type="button" className={`btnlink rounded-3 p-1 `} />
                            </div>
                        </div>
                        <p className="placeholder" />
                        <p className='placeholder' />
                        <p className="placeholder" />
                    </div>
                </div>
            </div>


        </div>
    )
}