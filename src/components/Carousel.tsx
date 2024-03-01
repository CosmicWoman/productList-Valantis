import React, {useRef, useState} from 'react';
import Icons from "../icons/icons";

const Carousel = () => {
    const [scrollWindow, setScrollWindow] = useState(0)
    const [scroll, setScroll] = useState(0)
    const [blockWidth, setBlockWidth] = useState<number>(0)

    const el = useRef<any>(null)

    let block = el.current

    return (
        <div className='carousel'>
            <div className="carousel__arrow-prev">
                <Icons name='arrow' size='25'/>
            </div>
            <div className="carousel__arrow-next">
                <Icons name='arrow' size='25'/>
            </div>

            <div
                className="carousel__container"
                ref={el}
                onClick={() => { setBlockWidth(block.scrollWidth)
                }}>

            </div>

        </div>
    );
};

export default Carousel;