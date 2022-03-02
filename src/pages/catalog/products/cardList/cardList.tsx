import React from 'react';
import { Card, Typography } from 'antd';
import './cardList.less';

interface Props {
    title: string,
    cost: number,
    maker: string,
    category: string
}

const { Title, Text } = Typography;

const CardProduct: React.FC<Props> = ({ title, cost, maker, category }) => {
    return (
        <div className='cardList'>
            <Card title={<>
                <Title level={3}>{title}</Title>
                <Text>{category}</Text>
            </>}>
                <p>Cost: {cost}$</p>
                <p>Maker: {maker}</p>
            </Card>
        </div>
    );
}

export default CardProduct;