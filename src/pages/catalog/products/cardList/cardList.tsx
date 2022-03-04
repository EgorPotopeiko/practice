import React from 'react';
import { Card, Typography } from 'antd';
import './cardList.less';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { addedToCart } from '../../../../store/cart/actions';
import { useDispatch } from 'react-redux';
import ProductsDB from '../../../../services';

interface Props {
    id: string,
    title: string,
    cost: number,
    maker: string,
    category: string
}

const { Title, Text } = Typography;

const CardProduct: React.FC<Props> = ({ id, title, cost, maker, category }) => {
    const dispatch = useDispatch();
    const database = new ProductsDB();

    const loadProduct = (id: any) => {
        database.getProduct(id)
            .then((response) => {
                const newCartItem = {
                    id: response.id,
                    title: response.title,
                    desc: response.description,
                    cost: response.cost,
                    date: response.date,
                    maker: response.maker,
                    category: response.category,
                    subcategory: response.subcategory
                }
                dispatch(addedToCart(newCartItem))
            })
    }

    return (
        <div className='cardList'>
            <Card hoverable title={<>
                <Title level={3}>{title}</Title>
                <Text>{category}</Text>
                <ShoppingCartOutlined onClick={() => loadProduct(id)} />
            </>}>
                <p>Cost: {cost}$</p>
                <p>Maker: {maker}</p>
            </Card>
        </div>
    );
}

export default CardProduct;