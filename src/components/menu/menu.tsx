import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import AdminCategory from '../../pages/admin_panel/admin_category';
import OrderData from '../../pages/admin_panel/admin_orders/admin_data';
import OrderFilters from '../../pages/admin_panel/admin_orders/filters';
import ProductsData from '../../pages/admin_panel/admin_products/admin_data';
import ProductsFilter from '../../pages/admin_panel/admin_products/filters';
import { GetFilters } from '../../store/filters/actions';
import { selectFilters } from '../../store/filters/selectors';
import { selectListCategories } from '../../store/category/selectors';
import { selectUserStatus } from '../../store/login/selectors';
import { GetPage } from '../../store/products/actions';
import { selectPageStatus } from '../../store/products/selectors';
import { TCategory } from '../../models/category';
import './menu.less';
import AdminForms from '../../pages/admin_panel/admin_forms/admin_forms';

const { TabPane } = Tabs;

export type TMenuState = {
    searchArticle: string,
    searchStatus: boolean,
    chooseStatus: "оплачен" | string,
    searchUser: string,
    searchNumber: string
}

const Menu: React.FC = () => {
    const { user } = useSelector(selectUserStatus);
    const { pageSize } = useSelector(selectPageStatus);
    const userTabs = useSelector(selectListCategories);
    const { price, search } = useSelector(selectFilters);
    const [filter, setFilter] = useState<TMenuState>({
        searchArticle: '',
        searchStatus: true,
        chooseStatus: "оплачен",
        searchUser: "",
        searchNumber: ""
    });
    const dispatch = useDispatch();
    const handlerFilter = (type: keyof TMenuState) => (value: any) => {
        setFilter({
            ...filter,
            [type]: value
        })
    }
    //handlers
    const handler = (categories: string) => {
        const putCategory = [];
        const findCategory = userTabs.find((category: TCategory) => category.title === categories);
        putCategory.push(findCategory.id);
        dispatch(GetPage(1, pageSize));
        dispatch(GetFilters(search, price, putCategory));
    }

    return (
        <div className="menu__catalog">
            {user.role === "ADMIN" &&
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
            }
            {(user.role === "USER" || user.role === "GUEST") &&
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    onChange={(categories: string) => handler(categories)}>
                    {userTabs.map((category: TCategory) => (
                        <TabPane tab={category.title} key={category.title} />
                    ))}
                </Tabs>
            }
        </div>
    );
}

export default Menu;