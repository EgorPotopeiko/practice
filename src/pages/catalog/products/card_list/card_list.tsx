import React from 'react';
import { Card, Divider, Typography } from 'antd';
import './card_list.less';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../../../store/login/selectors';
import { GetProductStartAction } from '../../../../store/products/actions';
import { GetAddedCartAction } from '../../../../store/cart/actions';

const { Title, Text } = Typography;

type Props = {
    id: string,
    title: string,
    price: number,
    category: string,
    img: string
}

const CardProduct: React.FC<Props> = ({ id, title, price, category, img }) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectAuth);
    let mas: Array<string> = [];
    (function func() { for (const elements of category) { mas.push(elements + ' ') } })()
    return (
        <div className='card__list'>
            <Card title={<>
                <Title onClick={isAuth ? () => dispatch(GetProductStartAction(id)) : undefined} level={3}>{isAuth ? <Link to={`/auth/product/${id}`}>{title}</Link> : title}</Title>
                <Text>{mas}</Text>
                <ShoppingCartOutlined hidden={isAuth ? false : true} onClick={() => dispatch(GetAddedCartAction({ id, title, category, price, img }))} />
            </>}
                cover={<img alt="example" src={img} />}>
                <Divider />
                <p>Стоимость: {price} руб.</p>
            </Card>
        </div>
    );
}

export default CardProduct;