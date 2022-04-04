/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/Menu';
import { ProductsActionTypes } from '../../store/products/action-types';

const AdminPanel: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: ProductsActionTypes.LOAD_PRODUCTS_START
        })
    }, [])
    return (
        <div className="adminPanel">
            <Header />
            <Menu />
        </div>
    );
}

export default AdminPanel;