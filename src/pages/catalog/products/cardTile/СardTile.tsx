import React from 'react';
import { Card, Typography } from 'antd';
import './СardTile.less';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsActionTypes } from '../../../../store/products/action-types';
import { Link } from 'react-router-dom';
import { selectUser } from '../../../../store/login/selectors';

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
                <p>{cost} руб.</p>
                <ShoppingCartOutlined hidden={user.isAuth ? false : true} />
            </Card>
        </div>
    );
}

export default CardTile;