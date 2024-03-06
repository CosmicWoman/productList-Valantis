import React, {FC, useMemo, useRef, useState} from 'react';
import CreateList from "./Content/UI/CreateList";
import Icons from "../icons/icons";
import '../style/Pagination.scss'

interface PaginationType {
    totalPage: number,
    activePage: number,
    prev: () => void,
    next: () => void,
    setActivePage: (activePage: number) => void
}

const Pagination: FC<PaginationType> = ({totalPage, activePage, prev, next, setActivePage}) => {
    const pageArray = useMemo(() => {
        let arr = []
        let fivePages = []
        for (let i = 0; i < totalPage; i++) {
            arr.push(i + 1)
        }
        if (totalPage - activePage <= 1) {
            for (let i = activePage - 3; i <= activePage; i++) {
                fivePages.push(arr[i])
            }
            for (let i = 0; i < (totalPage - activePage); i++) {
                fivePages.push(arr[i])
            }
        } else if (activePage - 3 === -2) {
            fivePages.push(arr[arr.length - 2])
            fivePages.push(arr[arr.length - 1])
            for (let i = 0; i <= activePage + 1; i++) {
                fivePages.push(arr[i])
            }
        } else if (activePage - 3 === -1) {
            fivePages.push(arr[arr.length - 1])
            for (let i = 0; i <= activePage + 1; i++) {
                fivePages.push(arr[i])
            }
        } else {
            fivePages = arr.slice(activePage - 3, activePage + 2)
        }

        return fivePages
    }, [totalPage, activePage])


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
                <CreateList items={pageArray} renderItem={(page: number) =>
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