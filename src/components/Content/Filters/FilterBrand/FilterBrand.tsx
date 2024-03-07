import React, {FC, useEffect, useState} from 'react';
import CreateList from "../../UI/CreateList";
import './FilterBrand.scss'
import Icons from "../../../../icons/icons";
import {getBrands} from "../../../../api/api";

interface filterBrandType {
    filterBrands: string,
    setFilterBrand: (filterBrands: string) => void
}

const FilterBrand: FC<filterBrandType> = ({filterBrands, setFilterBrand}) => {
    const [brands, setBrands] = useState<string[]>([])

    useEffect(() => {
        brandsApi()
    }, []);

    async function brandsApi(){
        let brand = await getBrands('brand')
        setBrands(Array.from(new Set(brand)).slice(1).sort((a,b) => a.localeCompare(b)))
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
            </div>
        </div>
    );
};

export default FilterBrand;