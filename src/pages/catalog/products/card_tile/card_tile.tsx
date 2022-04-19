import React from 'react';
import { Card, Typography } from 'antd';
import './card_tile.less';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserStatus } from '../../../../store/login/selectors';
import { GetProductStartAction } from '../../../../store/products/actions';
import { GetAddedCartAction } from '../../../../store/cart/actions';
import { TCategory } from '../../../../models/category';

const { Title } = Typography;

type Props = {
    id: number,
    title: string,
    price: number,
    categories: Array<TCategory>,
    img: string
}

const CardTile: React.FC<Props> = ({ id, title, price, categories, img }) => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector(selectUserStatus);
    return (
        <div className='card__tile'>
            <Card size="small" title={(
                <Title onClick={isAuth ? () => dispatch(GetProductStartAction(id)) : undefined} level={4}>{isAuth ? <Link to={`/auth/product/${id}`}>{title}</Link> : title}</Title>
            )}>
                <p>{price} руб.</p>
                <ShoppingCartOutlined hidden={isAuth ? false : true} onClick={() => dispatch(GetAddedCartAction([{ id: id }], { id, title, price, categories, img }))} />
            </Card>
        </div>
    );
}

export default CardTile;