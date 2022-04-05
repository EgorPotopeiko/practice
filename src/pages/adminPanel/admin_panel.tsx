/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/header';
import Menu from '../../components/menu';
import { GetProductsStartAction } from '../../store/products/actions';

const AdminPanel: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetProductsStartAction())
    }, [])
    return (
        <div className="admin__panel">
            <Header />
            <Menu />
        </div>
    );
}

export default AdminPanel;