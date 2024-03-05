import { StarRat } from '../FiveStar';
export const FeedBackListLoader = () => {
    return (
        <>
            <div className='m-auto' style={{ opacity: .2 }}>
                <div className="row m-sm-1 row-cols-1 row-cols-sm-1 row-cols-md-2  row-cols-xl-3" >
                    {Array.from({ length: 6 }).map(() => (
                        <div className="col rounded p-1  " >
                            <div className="card text-color p-2 h-100">
                                <div className="">
                                    <div className="  d-flex align-items-center">
                                        <img className="card-img-top placeholder rounded float-start" style={{
                                            width: '90px', aspectRatio: '1 / 1'
                                        }} />
                                        <div className='h-100 w-100 my-auto float-start ms-1 placeholder-wave'>
                                            <p className="card-text m-0  w-75 placeholder my-1" />
                                            <p className="card-text m-0  w-100 placeholder my-1" />
                                            <p className="card-text m-0  w-100 placeholder my-1" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="card-text   w-50  placeholder" />
                                    </div>
                                    <div className='col '>
                                        <div className='d-flex  placeholder-wave'>
                                            <p className="card-text my-1 me-2 w-25 placeholder" />
                                            <StarRat rat={5} />
                                        </div>
                                        <p className="card-text my-1 me-2 w-25 placeholder" />
                                        <div>
                                        </div>
                                        <p className="card-text my-1 w-100 placeholder" />
                                        <p className="card-text my-1 w-100 placeholder" />
                                        <p className="card-text my-1 w-100 placeholder" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}