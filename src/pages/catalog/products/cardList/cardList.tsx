import React from 'react';
import { Card, Typography } from 'antd';
import './cardList.less';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { addedToCart } from '../../../../store/cart/actions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import ProductsDB from '../../../../services';

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

const { Title, Text } = Typography;

const CardProduct: React.FC<Props> = ({ id, title, desc, cost, available, maker, category, subcategory }) => {
    const dispatch = useDispatch();
    const database = new ProductsDB();
    const user = useSelector((state: RootStateOrAny) => state.userReducer.user);

    const loadProduct = (id: any) => {
        database.getProduct(id)
            .then((response) => {
                const newCartItem = {
                    id: response.id,
                    title: response.title,
                    cost: response.cost,
                    category: response.category,
                    subcategory: response.subcategory,
                }
                dispatch(addedToCart(newCartItem))
            })
    }

    return (
        <div className='cardList'>
            <Card hoverable title={<>
                <Title level={3}>{title}</Title>
                <Text>{category}</Text>
                <ShoppingCartOutlined hidden={user.role === "user" ? false : true} onClick={() => loadProduct(id)} />
            </>}>
                <p>Стоимость: {cost} руб.</p>
                <p>Производитель: {maker}</p>
            </Card>
        </div>
    );
}

export default CardProduct;