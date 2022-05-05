import React, { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/header';
import CartDB from '../../services/cart_service';
import { GetCartAction } from '../../store/cart/actions';
import Cart from './cart';

const ShoppingCart: FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        CartDB.getCart()
            .then((response: any) => response.data)
            .then((data: any) => dispatch(GetCartAction(data.products)))
        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);
    return (
        <div className="shopping__cart">
            <Header />
            <Cart />
        </div>
    );
}

export default ShoppingCart;