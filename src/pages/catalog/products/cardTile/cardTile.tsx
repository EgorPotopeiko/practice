import React from 'react';
import { Card } from 'antd';
import './cardTile.less';

interface Props {
    name: string,
    price: number
}

const CardTile: React.FC<Props> = ({ name, price }) => {
    return (
        <div className='cardTile'>
            <Card size="small" title={name}>
                <p>{price}$</p>
            </Card>
        </div>
    );
}

export default CardTile;