import React from 'react'
import { chevronDoubleLeftIcon, chevronDoubleRightIcon, chevronLeftIcon, chevronRightIcon } from '../Assets/Index'; // Importing icon

// Component for rendering pagination buttons
const PaginationButtons = ({ meta, page, setPage }) => {
    return (
        <div className='text-center mt-3'>
            <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                {/* Button to navigate to the first page */}
                <button type="button" className={`btn border  ${page === 1 && 'disabled'}`} onClick={() => setPage(1)}><img src={chevronDoubleLeftIcon} alt="<<" /></button>
                {/* Button to navigate to the previous page */}
                <button type="button" className={`btn border  ${page === 1 && 'disabled'}`} onClick={() => setPage(page === 1 ? '1' : page - 1)}><img src={chevronLeftIcon} alt="<" /></button>
                {/* Display current page number and total pages */}
                <button type="button" className="btn border text-color ">{page} of {meta.total_pages}</button>
                {/* Button to navigate to the next page */}
                <button type="button" className={`btn border  ${page === meta.total_pages && 'disabled'}`} onClick={() => setPage(page === meta.total_pages ? meta.total_pages : page + 1)}><img src={chevronRightIcon} alt=">" /></button>
                {/* Button to navigate to the last page */}
                <button type="button" className={`btn border  ${page === meta.total_pages && 'disabled'}`} onClick={() => setPage(meta.total_pages)}><img src={chevronDoubleRightIcon} alt=">>" /></button>
            </div>
        </div>
    )
}

export default PaginationButtons