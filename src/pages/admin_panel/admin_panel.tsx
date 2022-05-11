import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/header';
import Menu from '../../components/menu';
import { GetCategoriesStartAction } from '../../store/category/actions';
import { GetProductsStartAction } from '../../store/products/actions';

const AdminPanel: FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetProductsStartAction());
        dispatch(GetCategoriesStartAction())
    }, [])
    return (
        <div className="admin__panel">
            <Header />
            <Menu />
        </div>
    );
}

export default AdminPanel;