import React, { Dispatch, SetStateAction, useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import CartItems from './cart_items';
import CartOrder from './cart_order';
import { USER_PATH } from '../../../routing/names';
import CartDB from '../../../services/cart_service';
import './cart.less';

const Cart: FC = () => {
    const [visible, setVisible] = useState(false);
    const [idProduct, setIdProduct]: [number | null, Dispatch<SetStateAction<null>>] = useState(null);
    useEffect(() => {
        CartDB.getCart()
            .then((response: any) => response.data)
            .then((data: any) => setIdProduct(data.id))
    }, [idProduct])
    return (
        <div className="cart">
            <CartItems idProduct={idProduct !== null ? idProduct : undefined} />
            <Button type='primary' onClick={() => setVisible(true)}>Перейти к оформлению заказа</Button>
            <Button type='default'><Link to={USER_PATH.ORDERS}>Мои заказы</Link></Button>
            <CartOrder visible={visible} setVisible={setVisible} />
        </div>
    );
}

export default Cart;