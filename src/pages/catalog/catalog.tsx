import React from 'react';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/catalog/Menu';

const Catalog: React.FC = () => {
    return (
        <div className="catalog">
            <Header />
            <Menu />
        </div>
    );
}

export default Catalog;