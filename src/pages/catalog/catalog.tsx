import React from 'react';
import Header from '../../components/header';
import Menu from '../../components/menu';
import Products from './products';

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