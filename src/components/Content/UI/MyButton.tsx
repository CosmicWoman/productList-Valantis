import React, {FC} from 'react';
import './UI-style/myButton.scss'

interface MyButtonType {
    title: string,
    click: () => void
}

const MyButton: FC<MyButtonType> = ({title, click}) => {
    return (
        <div className='myButton'
             onClick={() => click}>
            <div className="myButton__title">
                {title}
            </div>
        </div>
    );
};

export default MyButton;