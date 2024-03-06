import React, {FC, useState} from 'react';
import './FilterName.scss'
import MyButton from "../../UI/MyButton";

interface filterNameType {
    searchQuery: string,
    setSearchQuery: (searchQuery: string) => void
}

const FilterName: FC<filterNameType> = ({searchQuery, setSearchQuery}) => {
const [search, setSearch] = useState('')
    return (
        <div className='filtersName'>
            <div className="filtersName__content">
                <div className="filtersName__title">
                    Поиск по названию
                </div>
                <div className="filtersName__input">
                    <input
                    type='text'
                    value={searchQuery}
                    placeholder='Введите название товара...'
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}/>
                </div>
                <div className="filtersName__btn">
                    <MyButton title={'Показать'} click={() => setSearchQuery(search)}/>
                </div>
            </div>
        </div>
    );
};

export default FilterName;