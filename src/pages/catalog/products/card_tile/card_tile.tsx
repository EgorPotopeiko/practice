import React from 'react';
import { Card, Typography } from 'antd';
import './card_tile.less';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../../../store/login/selectors';
import { GetProductStartAction } from '../../../../store/products/actions';
import { GetAddedCartAction } from '../../../../store/cart/actions';

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
    const user = useSelector(selectUser);
    return (
        <div className='card__tile'>
            <Card size="small" title={(
                <Title onClick={user.isAuth ? () => dispatch(GetProductStartAction(id)) : undefined} level={4}>{user.isAuth ? <Link to={`/auth/product/${id}`}>{title}</Link> : title}</Title>
            )}>
                <p>{price} руб.</p>
                <ShoppingCartOutlined hidden={user.isAuth ? false : true} onClick={() => dispatch(GetAddedCartAction({ id, title, category, price, img }))} />
            </Card>
        </div>
    );
}

export default CardTile;