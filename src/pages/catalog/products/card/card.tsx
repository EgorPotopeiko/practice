import React from 'react';
import { Card } from 'antd';
import './card.less';

interface Props {
    name: string,
    price: number
}

const CardProduct: React.FC<Props> = ({ name, price }) => {
    return (
        <div className='cardProduct'>
            <Card size="small" title={name}>
                <p>{price}$</p>
            </Card>
        </div>
    );
}

export default CardProduct;