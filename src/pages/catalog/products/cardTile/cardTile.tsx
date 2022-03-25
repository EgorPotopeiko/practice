import React from 'react';
import { Card, Typography } from 'antd';
import './CardTile.less';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { ProductsActionTypes } from '../../../../store/products/action-types';
import { Link } from 'react-router-dom';

const { Title } = Typography;

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

const CardTile: React.FC<Props> = ({ id, title, desc, cost, available, maker, category, subcategory }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user")!)
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
                <p>{cost} руб.</p>
                <ShoppingCartOutlined />
            </Card>
        </div>
    );
}

export default CardTile;