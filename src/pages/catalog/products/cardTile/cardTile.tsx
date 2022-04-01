import React from 'react';
import { Card } from 'antd';
import './CardTile.less';
import { addedToCart } from '../../../../store/cart/actions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
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

const CardTile: React.FC<Props> = ({ id, title, desc, cost, available, maker, category, subcategory }) => {
    const dispatch = useDispatch();
    const database = new ProductsDB();
    const user = useSelector((state: RootStateOrAny) => state.userReducer.user);
    const loadProduct = (id: string) => {
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
                <ShoppingCartOutlined hidden={user.role === "user" && available ? false : true} onClick={() => loadProduct(id)} />
            </Card>
        </div>
    );
}

export default CardTile;