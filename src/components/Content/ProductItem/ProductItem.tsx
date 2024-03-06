import React, {FC} from 'react';
import './ProductItem.scss'
import Icons from "../../../icons/icons";
import {productItemType} from "../../../types/types";


const ProductItem: FC<productItemType> = ({brand,id,price,product}) => {
    return (
        <div className='productItem'>
            <div className="productItem__content">
               <div className="productItem__product">
                   <div className="productItem__photo">
                       <Icons name='photo' size='100'/>
                   </div>
                   <div className="productItem__id">{id}</div>
                   <div className="productItem__title">{product}</div>
                   <div className="productItem__brand">{brand}</div>
                   <div className="productItem__price">{price}=00
                       <Icons name='rub' size='18'/>
                   </div>
               </div>
            </div>
        </div>
    );
};

export default ProductItem;