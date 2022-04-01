/* eslint-disable array-callback-return */
import { Button } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Cart.less"
import CartItems from './cartItems/CartItems';
import CartOrder from './cartOrder/CartOrder';
import { USER_PATH } from '../../../routing/names';

const { ORDERS } = USER_PATH

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