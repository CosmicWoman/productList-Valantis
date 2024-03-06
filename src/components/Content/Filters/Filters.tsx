import React, {FC} from 'react';
import FilterBrand from "./FilterBrand/FilterBrand";
import FilterName from "./FilterName/FilterName";
import './Filter.scss'
import FilterPrice from "./FilterPrice/FilterPrice";
import MyButton from "../UI/MyButton";
import {filtersType, startFilters} from "../../../types/types";

interface filtersSelectedType {
    priceFilter: number,
    setPriceFilter: (priceFilter: number) => void,
    searchQuery: string,
    setSearchQuery: (searchQuery: string) => void,
    filterBrands: string,
    setFilterBrand: (filterBrands: string) => void,
    setSelectedFilter: (priceFilter: filtersType) => void
}

const Filters: FC<filtersSelectedType> = ({
                                      priceFilter,
                                      setPriceFilter,
                                      searchQuery,
                                      setSearchQuery,
                                      filterBrands,
                                      setFilterBrand,
                                      setSelectedFilter
                                  }) => {
    return (
        <div className='filters'>
            <FilterName searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <FilterPrice priceFilter={priceFilter} setPriceFilter={setPriceFilter}/>
            <FilterBrand filterBrands={filterBrands} setFilterBrand={setFilterBrand}/>
            <MyButton title='Сбросить' click={() => setSelectedFilter(startFilters)}/>
        </div>
    );
};

export default Filters;