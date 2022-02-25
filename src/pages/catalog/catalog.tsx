import React from 'react';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/user/Menu';
import Products from './products/products';

const Catalog: React.FC = () => {
    return (
        <div className="catalog">
            <Header />
            <Menu />
            <Products />
        </div>
    );
}

export default Catalog;