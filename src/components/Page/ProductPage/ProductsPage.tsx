import React, {useEffect, useState} from 'react';
import {useGetApiMutation} from "../../../api/AuthApi";
import {
    filtersObjType,
    FiltersSelect,
    filtersType,
    productItemType,
    startProduct
} from "../../../types/types";
import CreateList from "../../Content/UI/CreateList";
import ProductItem from "../../Content/ProductItem/ProductItem";
import Filters from "../../Content/Filters/Filters";
import Pagination from "../../Pagination";
import './ProductsPage.scss'

const ProductsPage = () => {
    const [products, setProducts] = useState<productItemType[]>([startProduct])
    const [selectedFilter, setSelectedFilters] = useState<filtersType>(FiltersSelect)
    const [ids, setIds] = useState<string[]>([])
    const [totalPage, setTotalPage] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [pages, setPages] = useState<number[]>([])
    const [auth] = useGetApiMutation()
    const limit = 50

    useEffect(() => {
        idsApi()
        pagesArray()
    }, [selectedFilter, activePage]);

    useEffect(() => {
        productApi()
    }, [ids]);

    useEffect(() => {
        total()
        Params()
        paramsIds()
    }, [selectedFilter]);

    async function idsApi() {
        try {
            if (selectedFilter.price === 0 && selectedFilter.product.length === 0 && selectedFilter.brand.length === 0) {
                let idsProduct = await auth({
                    'action': 'get_ids',
                    'params': {'offset': limit * (activePage - 1), 'limit': 50}
                }).unwrap()
                // @ts-ignore
                let _idsProduct: string[] = Array.from(new Set(idsProduct.result))
                setIds(_idsProduct)
            } else {
                let idsProduct = await auth({
                    "action": "filter",
                    "params": Params()
                }).unwrap()
                let _idsProduct: string[] = Array.from(new Set(idsProduct.result))
                setIds(_idsProduct)
                setTotalPage(_idsProduct.length/limit)
            }
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message)
            }
            setTimeout(() => {idsApi()}, 1500)
        }
    }

    async function productApi() {
        try {
            let products = await auth({
                "action": "get_items",
                "params": {'ids': ids}
            }).unwrap()
            let _products: productItemType[] = Array.from(products.result)
            setProducts(_products)
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message)
            }
            setTimeout(() => {productApi()}, 1500)
        }
    }

    async function total() {
        try {
            let products = await auth({
                "action": "get_ids",
                "params": {}
            }).unwrap()
            let _products = Array.from(new Set(products.result)).length
            setTotalPage(Math.ceil(_products / limit))
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message)
            }
            setTimeout(() => { total()}, 1500)
        }

    }

    function pagesArray(){
        let arr = []
        let fivePages = []

        if (totalPage === 1) {
            fivePages.push(totalPage)
        } else {
            for (let i = 0; i < totalPage; i++) {
                arr.push(i + 1)
            }

            if (arr.length < 5) {
                fivePages = arr
            } else {
                if (totalPage - activePage === 0) {
                    for (let i = activePage - 3; i < activePage; i++) {
                        fivePages.push(arr[i])
                    }
                    for (let i = 0; i <= totalPage - activePage + 1; i++) {
                        fivePages.push(arr[i])
                    }
                } else
                 if (totalPage - activePage === 1) {
                    for (let i = activePage - 3; i <= activePage; i++) {
                        fivePages.push(arr[i])
                    }
                    for (let i = 0; i < totalPage - activePage; i++) {
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
            }
        }
        console.log(fivePages)
        setPages(fivePages)
        return fivePages
    }

    function prev() {
        if (activePage === 1) {
            setActivePage(totalPage)
        } else {
            setActivePage(activePage - 1)
        }
    }

    function next() {
        if (activePage === totalPage) {
            setActivePage(1)
        } else {
            setActivePage(activePage + 1)
        }
    }

    function selectedPrice(price: number){
        setSelectedFilters({...selectedFilter, price: price})
    }
    function selectedBrand(brand: string){
        setSelectedFilters({...selectedFilter, brand: brand})
    }
    function selectedProduct(product: string){
        setSelectedFilters({...selectedFilter, product: product})
    }
    function Params(){
        let params: filtersObjType = {
            'price': 0,
            'brand': '',
            'product': ''
        }
        if(selectedFilter.price > 0){
            params.price = selectedFilter.price
        } else { delete params.price}
        if(selectedFilter.product.length > 0){
            params.product = selectedFilter.product
        } else {delete params.product}
        if(selectedFilter.brand.length > 0){
            params.brand = selectedFilter.brand
        } else {delete params.brand}
        return params
    }

    function paramsIds() {
        if(ids.length !== 0){
            return {'ids':ids}
        } else{
            return {}
        }
    }

    return (
        <div className='productPage'>
            <div className="productPage__content">

                <div className="productPage__info">
                    <div className="productPage__filters">
                        <Filters priceFilter={selectedFilter.price}
                                 setPriceFilter={selectedPrice}
                                 searchQuery={selectedFilter.product}
                                 setSearchQuery={selectedProduct}
                                 filterBrands={selectedFilter.brand}
                                 setFilterBrand={selectedBrand}
                                 setSelectedFilter={setSelectedFilters}/>
                    </div>

                    {ids.length === 0 ?
                        <div className='productPage__loading'></div>
                        :
                        <div className="productPage__items product">
                            <CreateList items={products} renderItem={(product) =>
                                <div className='product__item'>
                                    <ProductItem
                                        brand={(product.brand) ? product.brand : null}
                                        id={product.id}
                                        price={product.price}
                                        product={product.product}/>
                                </div>
                            }/>
                        </div>
                    }


                </div>

                <div className="productPage__pagination">
                    <Pagination
                                activePage={activePage}
                                prev={() => prev()}
                                next={() => next()}
                                setActivePage={setActivePage}
                                pages={pages}
                    />
                </div>

            </div>
        </div>
    );
};

export default ProductsPage;