import React from 'react';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/user/Menu';
import Products from './products/products';

interface Props {
    data: Array<Object>
}

const Catalog: React.FC<Props> = ({ data }) => {
    return (
        <div className="catalog">
            <Header />
            <Menu />
            <Products data={data} />
        </div>
    );
}

export default Catalog;