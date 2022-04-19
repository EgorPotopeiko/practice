/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/header';
import CartDB from '../../services/cart_service';
import { GetCartAction } from '../../store/cart/actions';
import Cart from './cart';

const ShoppingCart: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        CartDB.getCart()
            .then((response: any) => response.data)
            .then((data: any) => dispatch(GetCartAction(data.products)))
    }, [])
    return (
        <div className="shopping__cart">
            <Header />
            <Cart />
        </div>
    );
}

export default ShoppingCart;