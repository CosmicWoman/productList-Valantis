import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import CreateList from "./Content/UI/CreateList";
import Icons from "../icons/icons";
import '../style/Pagination.scss'

interface PaginationType {
    activePage: number,
    prev: () => void,
    next: () => void,
    setActivePage: (activePage: number) => void,
    pages: number[]
}

const Pagination: FC<PaginationType> = ({activePage, prev, next, setActivePage, pages}) => {

    return (
        <div className='pagination'>
                    <div className="pagination__transition"
                         onClick={() => prev()}>
                        <div className="pagination__transition_prev">
                            <Icons name='arrow' size='25'/>
                        </div>
                        Prev
                    </div>

            <div className="pagination__pages">
                <CreateList items={pages} renderItem={(page: number) =>
                    <div key={page}
                         className={(page === activePage) ? 'pagination__pages_page-active' : 'pagination__pages_page'}
                         onClick={() => setActivePage(page)}>
                        {page}
                    </div>
                }/>
            </div>
                <div className="pagination__transition"
                     onClick={() => next()}>
                    Next
                    <div className="pagination__transition_next">
                        <Icons name='arrow-next' size='25'/>
                    </div>
                </div>

        </div>
    );
};

export default Pagination;