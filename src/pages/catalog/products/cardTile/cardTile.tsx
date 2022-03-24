import React from 'react';
import { Card } from 'antd';
import './CardTile.less';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface Props {
    id: string,
    title: string,
    desc: string,
    cost: number,
    available: boolean,
    maker: string,
    category: string,
    subcategory: string | undefined
}

const CardTile: React.FC<Props> = ({ id, title, desc, cost, available, maker, category, subcategory }) => {
    return (
        <div className='cardTile'>
            <Card size="small" title={title}>
                <p>{cost} руб.</p>
                <ShoppingCartOutlined />
            </Card>
        </div>
    );
}

export default CardTile;