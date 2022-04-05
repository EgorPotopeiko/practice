import React from 'react';
import Header from '../../components/header';
import Cart from './cart';

const ShoppingCart: React.FC = () => {
    return (
        <div className="shoppingCart">
            <Header />
            <Cart />
        </div>
    );
}

export default ShoppingCart;