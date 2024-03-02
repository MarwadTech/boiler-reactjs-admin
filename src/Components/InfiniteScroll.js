import React, { useEffect } from 'react';
import { arrowUpIcon } from '../Assets/Index';

export const InfiniteScroll = ({ id, page, setPage, meta, fetchData }) => {
    const handleScroll = () => {
        if (id.scrollTop + id.clientHeight + 1 >= id.scrollHeight) {
            if (page !== meta.total_pages) {
                setPage(page + 1);
                fetchData();
            }
        }
    };

    useEffect(() => {
        const id = document.getElementById('main');
        id.addEventListener('scroll', handleScroll);
        return () => id.removeEventListener('scroll', handleScroll);
    }, [page, meta.total_pages]);

    const scrollToTop = () => {
        const mainid = document.getElementById('main');
        mainid.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <div className="position-absolute bottom-0 end-0 m-4 p-2 pt-1 opacity-75  buttons " onClick={scrollToTop}><img src={arrowUpIcon} alt="^" /></div>
    )

}
