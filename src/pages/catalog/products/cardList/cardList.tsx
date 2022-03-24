import React from 'react';
import { Card, Divider, Typography } from 'antd';
import './CardList.less';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { ProductsActionTypes } from '../../../../store/products/action-types';

const { Title, Text } = Typography;

interface Props {
    id: string,
    title: string,
    desc: string,
    cost: number,
    available: boolean,
    maker: string,
    category: string,
    subcategory: string | undefined,
    img: string
}

const CardProduct: React.FC<Props> = ({ id, title, desc, cost, available, maker, category, subcategory, img }) => {
    const dispatch = useDispatch();
    return (
        <div className='cardList'>
            <Card title={<>
                <Title onClick={() => dispatch({
                    type: ProductsActionTypes.LOAD_PRODUCT_START,
                    id: id
                })} level={3}><Link to={`/${id}`}>{title}</Link></Title>
                <Text>{category}</Text>
                <ShoppingCartOutlined />
            </>}
                cover={<img alt="example" src={img} />}>
                <Divider />
                <p>Стоимость: {cost} руб.</p>
                <p>Производитель: {maker}</p>
            </Card>
        </div>
    );
}

export default CardProduct;