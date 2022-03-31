import React from 'react';
import { Card, Typography } from 'antd';
import './СardTile.less';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsActionTypes } from '../../../../store/products/action-types';
import { Link } from 'react-router-dom';
import { selectUser } from '../../../../store/login/selectors';
import { CartActionTypes } from '../../../../store/cart/action-types';

const { Title } = Typography;

interface Props {
    id: string,
    title: string,
    price: number,
    category: string,
    img: string
}

const CardTile: React.FC<Props> = ({ id, title, price, category, img }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    return (
        <div className='cardTile'>
            <Card size="small" title={
                <>
                    <Title onClick={user.isAuth ? () => dispatch({
                        type: ProductsActionTypes.LOAD_PRODUCT_START,
                        id: id
                    })
                        :
                        undefined} level={4}>{user.isAuth ? <Link to={`/auth/product/${id}`}>{title}</Link> : title}</Title>
                </>
            }>
                <p>{price} руб.</p>
                <ShoppingCartOutlined hidden={user.isAuth ? false : true} onClick={() => dispatch({
                    type: CartActionTypes.PRODUCT_ADDED,
                    item: { id, title, category, price, img }
                })} />
            </Card>
        </div>
    );
}

export default CardTile;