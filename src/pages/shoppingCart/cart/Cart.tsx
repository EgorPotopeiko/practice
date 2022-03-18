/* eslint-disable array-callback-return */
import { Button } from 'antd';
import React, { useState } from 'react';
import "./Cart.less"
import CartItems from './cartItems/cartItems';
import CartOrder from './cartOrder/cartOrder';

const Cart: React.FC = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="cart">
            <CartItems />
            <Button type='primary' onClick={() => setVisible(true)}>Перейти к оформлению заказа</Button>
            <Button type='default'>Мои заказы</Button>
            <CartOrder visible={visible} setVisible={setVisible} />
        </div>
    );
}

export default Cart;