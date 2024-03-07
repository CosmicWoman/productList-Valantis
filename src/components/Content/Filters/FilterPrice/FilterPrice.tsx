import React, {FC, useEffect, useState} from 'react';
import './FilterPrice.scss'
import {useGetApiMutation} from "../../../../api/AuthApi";
import MyButton from "../../UI/MyButton";
import {values} from "lodash";

interface filterPriceType {
    priceFilter: number,
    setPriceFilter: (priceFilter: number) => void
}

const FilterPrice: FC<filterPriceType> = ({priceFilter, setPriceFilter}) => {

    function valueUpdate() {
        if(priceFilter === 0){
            return ''
        } else {
            return priceFilter
        }
    }

    return (
        <div className='filterPrice'>
            <div className="filterPrice__content">
                <div className="filterPrice__title">
                    Поиск по цене
                </div>
                <div className="filterPrice__range">
                    <input
                        id='price'
                        type='text'
                        placeholder='Введите стоимость'
                        value={valueUpdate()}
                        onChange={(e) => {
                            setPriceFilter(Number(e.target.value = e.target.value.replace(/[^+\d]/g, '')))
                        }}/>
                </div>
            </div>
        </div>
    );
};

export default FilterPrice;