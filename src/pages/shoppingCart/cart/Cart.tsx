/* eslint-disable array-callback-return */
import React from 'react';
import "./Cart.less"
import CartItems from './cartItems/cartItems';
import CartOrder from './cartOrder/cartOrder';

const Cart: React.FC = () => {
    return (
        <div className="cart">
            <CartItems />
            <CartOrder />
        </div>
    );
}

export default Cart;