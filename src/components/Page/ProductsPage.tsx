import React, {useEffect, useState} from 'react';
import {useGetApiMutation} from "../../api/AuthApi";
import {
    filtersObjType,
    FiltersSelect,
    filtersType,
    productItemType,
    startFilters,
    startProduct
} from "../../types/types";
import CreateList from "../Content/UI/CreateList";
import ProductItem from "../Content/ProductItem/ProductItem";
import Filters from "../Content/Filters/Filters";
import Pagination from "../Pagination";
import './ProductsPage.scss'

const ProductsPage = () => {
    const [products, setProducts] = useState<productItemType[]>([startProduct])
    const [selectedFilter, setSelectedFilters] = useState<filtersType>(FiltersSelect)
    const [ids, setIds] = useState<string[]>([])
    const [totalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(1)
    const [auth] = useGetApiMutation()
    const limit = 50

    useEffect(() => {
        idsApi()
    }, [selectedFilter, page]);

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
            if (FiltersSelect == selectedFilter) {
                let idsProduct = await auth({
                    'action': 'get_ids',
                    'params': {'offset': limit * (page - 1), 'limit': 50}
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
        } catch (e) {
            console.log(e)
            idsApi()
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
        } catch (e) {
            console.log(e)
            productApi()
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
        if(selectedFilter.product !== ''){
            params.product = selectedFilter.product
        } else {delete params.product}
        if(selectedFilter.brand !== ''){
            params.brand = selectedFilter.brand
        } else {delete params.brand}
        console.log(params)
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
                </div>

                <div className="productPage__pagination">
                    <Pagination totalPage={totalPage} activePage={page} prev={() => prev()} next={() => next()} setActivePage={setPage}/>
                </div>

            </div>
        </div>
    );
};

export default ProductsPage;