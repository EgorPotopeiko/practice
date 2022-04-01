import React from 'react';
import Header from '../../components/header/Header';
import Cart from './cart/Cart';

const ShoppingCart: React.FC = () => {
    return (
        <div className="shoppingCart">
            <Header />
            <Cart />
        </div>
    );
}

export default ShoppingCart;