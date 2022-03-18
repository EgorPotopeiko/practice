import React from 'react';
import { Card, Typography } from 'antd';
import './cardList.less';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

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

const CardProduct: React.FC<Props> = ({ id, title, desc, cost, available, maker, category, subcategory }) => {
    return (
        <div className='cardList'>
            <Card title={<>
                <Title level={3}>{title}</Title>
                <Text>{category}</Text>
                <ShoppingCartOutlined />
            </>}>
                <p>Стоимость: {cost} руб.</p>
                <p>Производитель: {maker}</p>
            </Card>
        </div>
    );
}

export default CardProduct;