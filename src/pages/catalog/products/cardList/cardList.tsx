import React from 'react';
import { Card, Typography } from 'antd';
import './cardList.less';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface Props {
    id: string,
    title: string,
    cost: number,
    maker: string,
    category: string
}

const { Title, Text } = Typography;

const CardProduct: React.FC<Props> = ({ id, title, cost, maker, category }) => {
    return (
        <div className='cardList'>
            <Card hoverable title={<>
                <Title level={3}>{title}</Title>
                <Text>{category}</Text>
                <ShoppingCartOutlined onClick={() => console.log(id)} />
            </>}>
                <p>Cost: {cost}$</p>
                <p>Maker: {maker}</p>
            </Card>
        </div>
    );
}

export default CardProduct;