import React, {useEffect, useState} from 'react';
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
import {getFilter, getIds, getItems} from "../../../api/api";
import {ProductIdsType} from "../../../api/authApiTypes";

const ProductsPage = () => {
    const [products, setProducts] = useState<productItemType[]>([startProduct])
    const [selectedFilter, setSelectedFilters] = useState<filtersType>(FiltersSelect)
    const [ids, setIds] = useState<string[]>([])
    const [totalPage, setTotalPage] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const limit = 50

    useEffect(() => {
        idsApi()
    }, []);

    useEffect(() => {
        idsApi()
    }, [selectedFilter, activePage]);

    useEffect(() => {
        productApi()
    }, [ids]);

    useEffect(() => {
        total()
        Params()
        paramsIds()
    }, [selectedFilter]);

    async function idsApi(){
        if(selectedFilter.price === 0 &&
            selectedFilter.product.length === 0 &&
            selectedFilter.brand.length === 0) {
            let ids = await getIds(para())
            let _ids = Array.from(new Set(ids))
            setIds(_ids)
            setTotalPage(_ids.length/limit)
        } else {
            let params = Params()
            let ids = await getFilter(params)
            let _ids = Array.from(new Set(ids))
            setIds(_ids)
            setTotalPage(_ids.length/limit)
        }
    }

    async function productApi() {
        let products = await getItems(ids)
        setProducts(Array.from(products))
    }

    async function total() {
        let pages = await getIds({})
        let _pages = Array.from(new Set(pages)).length
        setTotalPage(Math.ceil(_pages / limit))
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

    function para(){
        let params: ProductIdsType = {
            'offset': 0,
            'limit': limit,
        }
        let item = limit * (activePage - 1)
        if(item !== 0){
            params.offset = item
        } else { delete params.offset}
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

                    {products.length === 0 ?
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
                                totalPage={totalPage}
                    />
                </div>

            </div>
        </div>
    );
};

export default ProductsPage;