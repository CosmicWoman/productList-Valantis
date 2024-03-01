import React, {useEffect, useState} from 'react';
import './App.css';
import {useGetApiMutation} from "./api/AuthApi";
import Pagination from "./components/Pagination";

function App() {

    const [auth] = useGetApiMutation()
    const [totalPage, setTotalPage] = useState(0)
    const limit = 50
    const [page, setPage] = useState(1)

    useEffect(() => {
        total()
    }, []);

    async function total() {
        try {
            let products = await auth({
                "action": "get_ids",
                "params": {}
            }).unwrap()
            let _products = Array.from(new Set(products.result)).length
            setTotalPage(Math.ceil(_products / limit))

            // let _pages = Math.ceil(_products / limit)
            // setPages(_pages)
        } catch (e) {
            console.log(e)
            total()
        }
    }

    function prev() {
        if (page === 1) {
            setPage(totalPage)
        } else {
            setPage(page - 1)
        }
    }

    function next() {
        if (page === totalPage) {
            setPage(1)
        } else {
            setPage(page + 1)
        }
    }

    return (
        <div className="App">
            <Pagination totalPage={totalPage} activePage={page} prev={() => prev()} next={() => next()}/>
        </div>
    );
}

export default App;
