/* eslint-disable array-callback-return */
import { Button } from 'antd';
import React, { useState } from 'react';
import './cart.less';
import CartItems from './cart_items';
import CartOrder from './cart_order';
import { USER_PATH } from '../../../routing/names';
import { Link } from 'react-router-dom';

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