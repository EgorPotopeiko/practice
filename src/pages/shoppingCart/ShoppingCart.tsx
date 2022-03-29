import React from 'react';
import CartHeader from '../../components/header/CartHeader/CartHeader';
import Cart from './cart/Cart';

const ShoppingCart: React.FC = () => {
    return (
        <div className="shoppingCart">
            <CartHeader />
            {/* <Cart /> */}
        </div>
    );
}

export default ShoppingCart;