import React, {FC, useEffect, useMemo, useState} from 'react';
import {useGetApiMutation} from "../../../../api/AuthApi";
import CreateList from "../../UI/CreateList";
import './FilterBrand.scss'
import MyButton from "../../UI/MyButton";
import Icons from "../../../../icons/icons";

interface filterBrandType {
    filterBrands: string,
    setFilterBrand: (filterBrands: string) => void
}

const FilterBrand: FC<filterBrandType> = ({filterBrands, setFilterBrand}) => {
    const [brands, setBrands] = useState<string[]>([])
    const [auth] = useGetApiMutation()

    useEffect(() => {
        brandsApi()
    }, []);

    async function brandsApi() {
        try {
            let brands = await auth({
                "action": "get_fields",
                "params": {field: 'brand'}
            }).unwrap()
            let _brands: string[] = Array.from(new Set(brands.result))
            setBrands(_brands)
        } catch (e) {
            console.log(e)
            brandsApi()
        }
    }

    function brandsFilter(brand: string){
        if(brand === filterBrands){
            setFilterBrand('')
        } else {
            setFilterBrand(brand)
        }
    }

    return (
        <div className='filtersBrand'>
            <div className="filtersBrand__content">
                <div className="filtersBrand__title">
                    Бренд
                </div>
                <div className="filtersBrand__list">
                    <CreateList items={brands} renderItem={(brand) =>
                        <div className='filtersBrand__brand'
                             key={brand}
                             onClick={() => brandsFilter(brand)}
                        >
                            {filterBrands === brand ?
                                <Icons name='check' size='24'/> :
                                <Icons name='circle' size='24'/>
                            }
                            <div className="filtersBrand__brand_title">
                                {brand}
                            </div>
                        </div>
                    }/>
                </div>
                <div className="filtersBrand__btn-delete">
                    <MyButton title={'Сбросить'} click={() => setFilterBrand('')}/>
                </div>
            </div>
        </div>
    );
};

export default FilterBrand;