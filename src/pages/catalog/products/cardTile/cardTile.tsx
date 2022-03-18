import React from 'react';
import { Card } from 'antd';
import './cardTile.less';
import { ShoppingCartOutlined } from '@ant-design/icons';

const CardTile: React.FC = () => {
    return (
        <div className='cardTile'>
            <Card size="small" title={"title"}>
                <p>cost руб.</p>
                <ShoppingCartOutlined />
            </Card>
        </div>
    );
}

export default CardTile;