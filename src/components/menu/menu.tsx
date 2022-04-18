import { Tabs } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminCategory from '../../pages/admin_panel/admin_category';
import OrderData from '../../pages/admin_panel/admin_orders/admin_data';
import OrderFilters from '../../pages/admin_panel/admin_orders/filters';
import ProductsData from '../../pages/admin_panel/admin_products/admin_data';
import ProductsFilter from '../../pages/admin_panel/admin_products/filters';
import { GetFilters } from '../../store/filters/actions';
import { selectAllFilters } from '../../store/filters/selectors';
import { selectListCategories } from '../../store/category/selectors';
import { selectUser } from '../../store/login/selectors';
import './menu.less';
import { GetPage } from '../../store/products/actions';
import { selectPageSize } from '../../store/products/selectors';
import { TCategory } from '../../models/category';

const { TabPane } = Tabs;

export type TMenuState = {
    searchName: string
    searchArticle: string
    searchCategory: '' | string
    searchStatus: boolean
    chooseStatus: "оплачен" | string
    searchUser: string
    searchNumber: string
}

const Menu: React.FC = () => {
    const user = useSelector(selectUser);
    const pageSize = useSelector(selectPageSize);
    const userTabs = useSelector(selectListCategories);
    const dispatch = useDispatch();
    const filters = useSelector(selectAllFilters);
    const { price, search } = filters;

    const [filter, setFilter] = useState<TMenuState>({
        searchName: '',
        searchArticle: '',
        searchCategory: '',
        searchStatus: true,
        chooseStatus: "оплачен",
        searchUser: "",
        searchNumber: "",
    });
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
                        <ProductsData
                            searchName={filter.searchName}
                            searchArticle={filter.searchArticle}
                            searchCategory={filter.searchCategory}
                            searchStatus={filter.searchStatus} />
                    </TabPane>
                    <TabPane tab="КАТЕГОРИИ" key="КАТЕГОРИИ"><AdminCategory /></TabPane>
                    <TabPane tab="ЗАКАЗЫ" key="ЗАКАЗЫ">
                        <OrderFilters handlerFilter={handlerFilter} />
                        <OrderData
                            chooseStatus={filter.chooseStatus}
                            searchUser={filter.searchUser}
                            searchNumber={filter.searchNumber} />
                    </TabPane>
                </Tabs>
            }
            {(user.role === "USER" || user.role === "GUEST") &&
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    onChange={(categories: string) => handler(categories)}>
                    {userTabs.map((item: TCategory) => (
                        <TabPane tab={item.title} key={item.title} />
                    ))}
                </Tabs>
            }
        </div>
    );
}

export default Menu;