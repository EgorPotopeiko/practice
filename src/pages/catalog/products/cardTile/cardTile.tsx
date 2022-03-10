import React from 'react';
import { Card, Typography } from 'antd';
import './cardTile.less';
import { addedToCart } from '../../../../store/cart/actions';
import { useDispatch } from 'react-redux';
import ProductsDB from '../../../../services';
import { ShoppingCartOutlined } from '@ant-design/icons';

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

const { Title, Text } = Typography;

const CardTile: React.FC<Props> = ({ id, title, desc, cost, available, maker, category, subcategory }) => {
    const dispatch = useDispatch();
    const database = new ProductsDB();

    const loadProduct = (id: any) => {
        database.getProduct(id)
            .then((response) => {
                const newCartItem = {
                    id: response.id,
                    title: response.title,
                    cost: response.cost,
                    category: response.category,
                    subcategory: response.subcategory,
                }
                dispatch(addedToCart(newCartItem))
            })
    }
    return (
        <div className='cardTile'>
            <Card size="small" title={title}>
                <p>{cost} руб.</p>
                <ShoppingCartOutlined onClick={() => loadProduct(id)} />
            </Card>
        </div>
    );
}

export default CardTile;