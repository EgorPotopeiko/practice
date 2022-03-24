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
    const user = JSON.parse(localStorage.getItem("user")!)
    return (
        <div className='cardList'>
            <Card title={<>
                <Title onClick={user.isAuth ? () => dispatch({
                    type: ProductsActionTypes.LOAD_PRODUCT_START,
                    id: id
                })
                    :
                    undefined} level={3}>{user.isAuth ? <Link to={`/auth/product/${id}`}>{title}</Link> : title}</Title>
                <Text>{category}</Text>
                <ShoppingCartOutlined hidden={user.isAuth ? false : true} />
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