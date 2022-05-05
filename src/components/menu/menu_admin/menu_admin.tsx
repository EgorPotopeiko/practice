import React, { useState, FC } from 'react';
import { Tabs } from 'antd';
import AdminCategory from '../../../pages/admin_panel/admin_category';
import OrderData from '../../../pages/admin_panel/admin_orders/admin_data';
import OrderFilters from '../../../pages/admin_panel/admin_orders/filters';
import ProductsData from '../../../pages/admin_panel/admin_products/admin_data';
import ProductsFilter from '../../../pages/admin_panel/admin_products/filters';
import './menu_admin.less';
import AdminForms from '../../../pages/admin_panel/admin_forms/admin_forms';

const { TabPane } = Tabs;

export type TMenuState = {
    searchArticle: string,
    searchStatus: boolean,
    chooseStatus: "оплачен" | string,
    searchUser: string,
    searchNumber: string
}

const MenuAdmin: FC = () => {
    const [filter, setFilter] = useState<TMenuState>({
        searchArticle: '',
        searchStatus: true,
        chooseStatus: "оплачен",
        searchUser: "",
        searchNumber: ""
    });
    const handlerFilter = (type: keyof TMenuState) => (value: any) => {
        setFilter({
            ...filter,
            [type]: value
        })
    }

    return (
        <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="ТОВАРЫ" key="ТОВАРЫ">
                <ProductsFilter handlerFilter={handlerFilter} />
                <ProductsData searchArticle={filter.searchArticle} />
            </TabPane>
            <TabPane tab="КАТЕГОРИИ" key="КАТЕГОРИИ"><AdminCategory /></TabPane>
            <TabPane tab="ЗАКАЗЫ" key="ЗАКАЗЫ">
                <OrderFilters handlerFilter={handlerFilter} />
                <OrderData
                    chooseStatus={filter.chooseStatus}
                    searchUser={filter.searchUser}
                    searchNumber={filter.searchNumber} />
            </TabPane>
            <TabPane tab="ПРОЕКТЫ" key="ПРОЕКТЫ"><AdminForms /></TabPane>
        </Tabs>
    );
}

export default MenuAdmin;