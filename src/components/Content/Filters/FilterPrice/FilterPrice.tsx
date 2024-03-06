import React, {FC, useEffect, useState} from 'react';
import './FilterPrice.scss'
import {useGetApiMutation} from "../../../../api/AuthApi";
import MyButton from "../../UI/MyButton";

interface filterPriceType {
    priceFilter: number,
    setPriceFilter: (priceFilter: number) => void
}

const FilterPrice: FC<filterPriceType> = ({priceFilter, setPriceFilter}) => {
    const [auth] = useGetApiMutation()
    const [maxPrice, setMaxPrice] = useState(0)
    const [price, setPrice] = useState(maxPrice)

    useEffect(() => {
        brandsApi()
    }, []);

    async function brandsApi() {
        try {
            let price = await auth({
                "action": "get_fields",
                "params": {field: 'price'}
            }).unwrap()
            let _price: number[] = Array.from(new Set(price.result))
            let max = Math.max.apply(null, _price)
            setMaxPrice(max)
            setPrice(max)
        } catch (e) {
            brandsApi()
        }
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        let result = Number(e.currentTarget.value)
        setPrice(result)
        setPriceFilter(result)
    }

    return (
        <div className='filterPrice'>
            <div className="filterPrice__content">
                <div className="filterPrice__title"></div>
                <div className="filterPrice__range">
                    <input
                        id='price'
                        className='filterPrice__range_input'
                        type='range'
                        step={500}
                        value={price}
                        min={0}
                        max={maxPrice}
                        onChange={handleChange}
                    />
                    <div className="filterPrice__range_values">{price}</div>
                </div>
                <div className="filterPrice__btn">
                    <MyButton title={'Сбросить'} click={() => setPriceFilter(maxPrice)}/>
                </div>
            </div>
        </div>
    );
};

export default FilterPrice;