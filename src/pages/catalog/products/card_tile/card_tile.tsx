import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { selectUserStatus } from '../../../../store/login/selectors';
import { GetProductStartAction } from '../../../../store/products/actions';
import { GetAddedCartAction } from '../../../../store/cart/actions';
import { TCategory } from '../../../../models/category';
import './card_tile.less';

const { Title } = Typography;

type Props = {
    id: number,
    title: string,
    price: number,
    categories: Array<TCategory>,
    img: string
}

const CardTile: FC<Props> = ({ id, title, price }) => {
    const { isAuth } = useSelector(selectUserStatus);
    const dispatch = useDispatch();
    return (
        <div className='card__tile'>
            <Card size="small" title={(
                <Title onClick={isAuth ? () => dispatch(GetProductStartAction(id)) : undefined} level={4}>{isAuth ? <Link to={`/auth/product/${id}`}>{title}</Link> : title}</Title>
            )}>
                <p>{price} руб.</p>
                <ShoppingCartOutlined hidden={isAuth ? false : true} onClick={() => dispatch(GetAddedCartAction([{ id: id }]))} />
            </Card>
        </div>
    );
}

export default CardTile;