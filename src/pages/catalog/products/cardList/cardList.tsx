import React from 'react';
import { Card } from 'antd';
import './cardList.less';

interface Props {
    name: string,
    price: number,
    desc: string,
}

const CardProduct: React.FC<Props> = ({ name, price, desc }) => {
    return (
        <div className='cardList'>
            <Card title={name}>
                <p>{price}$</p>
                <p>{desc}</p>
            </Card>
        </div>
    );
}

export default CardProduct;