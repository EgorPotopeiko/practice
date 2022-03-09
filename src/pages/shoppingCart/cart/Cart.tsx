/* eslint-disable array-callback-return */
import { Button } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Cart.less"
import CartItems from './cartItems/cartItems';
import CartOrder from './cartOrder/cartOrder';
import { AUTH_PATH } from '../../../routing/names';

const { ORDERS } = AUTH_PATH

const Cart: React.FC = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="cart">
            <CartItems />
            <Button type='primary' onClick={() => setVisible(true)}>Перейти к оформлению заказа</Button>
            <Button type='default'><Link to={ORDERS}>Мои заказы</Link></Button>
            <CartOrder visible={visible} setVisible={setVisible} />
        </div>
    );
}

export default Cart;