import { Tabs } from 'antd';
import React from 'react';
import { useState } from 'react';
import OrderData from '../../../pages/adminPanel/adminOrders/adminData/OrderData';
import OrderFilters from '../../../pages/adminPanel/adminOrders/filters/orderFilters';
import ProductsData from '../../../pages/adminPanel/adminProducts/adminData/ProductsData';
import ProductsFilter from '../../../pages/adminPanel/adminProducts/filters/productsFilters';
import './Menu.less';

const { TabPane } = Tabs;

const Menu: React.FC = () => {
    const [searchName, setSearchName] = useState('');
    const [searchArticle, setSearchArticle] = useState('');
    const [searchCategory, setSearchCategory] = useState('ALL');
    const [searchStatus, setSearchStatus] = useState(true);
    return (
        <div className="menu__catalog">
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="ТОВАРЫ" key="products">
                    <ProductsFilter setSearchName={setSearchName} setSearchArticle={setSearchArticle} setSearchCategory={setSearchCategory} setSearchStatus={setSearchStatus} />
                    <ProductsData searchName={searchName} searchArticle={searchArticle} searchCategory={searchCategory} searchStatus={searchStatus} />
                </TabPane>
                <TabPane tab="КАТЕГОРИИ" key="category">
                </TabPane>
                <TabPane tab="ЗАКАЗЫ" key="orders">
                    <OrderFilters />
                    <OrderData />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Menu;