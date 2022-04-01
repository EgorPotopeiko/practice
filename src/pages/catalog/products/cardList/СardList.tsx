import React from 'react';
import { Card, Divider, Typography } from 'antd';
import './СardList.less';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsActionTypes } from '../../../../store/products/action-types';
import { selectUser } from '../../../../store/login/selectors';
import { CartActionTypes } from '../../../../store/cart/action-types';

const { Title, Text } = Typography;

interface Props {
    id: string,
    title: string,
    price: number,
    category: string,
    img: string
}

const CardProduct: React.FC<Props> = ({ id, title, price, category, img }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    return (
        <div className='cardList'>
            <Card title={<>
                <Title onClick={user.isAuth ? () => dispatch({
                    type: ProductsActionTypes.LOAD_PRODUCT_START,
                    id: id
                })
                    :
                    undefined} level={3}>{user.isAuth ? <Link to={`/auth/product/${id}`}>{title}</Link> : title}</Title>
                <Text>{category[0]} {category[1]}</Text>
                <ShoppingCartOutlined hidden={user.isAuth ? false : true} onClick={() => dispatch({
                    type: CartActionTypes.PRODUCT_ADDED,
                    item: { id, title, category, price, img }
                })} />
            </>}
                cover={<img alt="example" src={img} />}>
                <Divider />
                <p>Стоимость: {price} руб.</p>
            </Card>
        </div>
    );
}

export default CardProduct;