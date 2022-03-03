import { Tabs } from 'antd';
import React from 'react';
import { useState } from 'react';
import AdminData from '../../../pages/adminPanel/adminData/AdminData';
import AdminFilters from '../../../pages/adminPanel/filters/adminFilters';
import './Menu.less';

const { TabPane } = Tabs;

const Menu: React.FC = () => {
    const [searchName, setSearchName] = useState('');
    const [searchActicle, setSearchArticle] = useState('');
    const [searchCategory, setSearchCategory] = useState('ALL');
    const [searchStatus, setSearchStatus] = useState(true);
    return (
        <div className="menu__catalog">
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="ТОВАРЫ" key="products">
                    <AdminFilters setSearchName={setSearchName} setSearchArticle={setSearchArticle} setSearchCategory={setSearchCategory} setSearchStatus={setSearchStatus} />
                    <AdminData searchName={searchName} searchArticle={searchActicle} searchCategory={searchCategory} searchStatus={searchStatus} />
                </TabPane>
                <TabPane tab="КАТЕГОРИИ" key="category">
                </TabPane>
                <TabPane tab="ЗАКАЗЫ" key="orders">
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Menu;