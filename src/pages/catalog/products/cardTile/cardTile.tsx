import React from 'react';
import { Card } from 'antd';
import './cardTile.less';

interface Props {
    title: string,
    cost: number
}

const CardTile: React.FC<Props> = ({ title, cost }) => {
    return (
        <div className='cardTile'>
            <Card size="small" title={title}>
                <p>{cost}$</p>
            </Card>
        </div>
    );
}

export default CardTile;