import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Divider, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { selectUserStatus } from '../../../../store/login/selectors';
import { GetProductStartAction } from '../../../../store/products/actions';
import { GetAddedCartAction } from '../../../../store/cart/actions';
import { TProduct } from '../../../../models/product';
import './card_list.less';

const { Title, Text } = Typography;

const CardProduct: FC<TProduct> = ({ id, title, price, categories, img }) => {
    const { isAuth } = useSelector(selectUserStatus);
    const dispatch = useDispatch();
    let mas: Array<string> = [];
    (function func() { for (const elements of categories) { mas.push(elements.title + ' ') } })()
    return (
        <div className='card__list'>
            <Card title={<>
                <Title onClick={isAuth ? () => dispatch(GetProductStartAction(id)) : undefined} level={3}>{isAuth ? <Link to={`/auth/product/${id}`}>{title}</Link> : title}</Title>
                <Text>{mas}</Text>
                <ShoppingCartOutlined hidden={isAuth ? false : true} onClick={() => dispatch(GetAddedCartAction([{ id: id }]))} />
            </>}
                cover={<img alt="example" src={img} />}>
                <Divider />
                <p>Стоимость: {price} руб.</p>
            </Card>
        </div>
    );
}

export default CardProduct;