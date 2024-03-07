import React, {FC} from 'react';
import './FilterName.scss'

interface filterNameType {
    searchQuery: string,
    setSearchQuery: (searchQuery: string) => void
}

const FilterName: FC<filterNameType> = ({searchQuery,setSearchQuery}) => {

    return (
        <div className='filtersName'>
            <div className="filtersName__content">
                <div className="filtersName__title">
                    Поиск по названию
                </div>
                <div className="filtersName__input">
                    <input
                        type='text'
                        id='search'
                        placeholder='Введите название товара...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}/>
                </div>
            </div>
        </div>
    );
};

export default FilterName;