import { Tabs } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminCategory from '../../pages/adminPanel/adminCategory/AdminCategory';
import OrderData from '../../pages/adminPanel/adminOrders/adminData/OrderData';
import OrderFilters from '../../pages/adminPanel/adminOrders/filters/OrderFilters';
import ProductsData from '../../pages/adminPanel/adminProducts/adminData/ProductsData';
import ProductsFilter from '../../pages/adminPanel/adminProducts/filters/ProductsFilters';
import { FiltersActionTypes } from '../../store/filters/action-types';
import { selectFilters, selectUserMenu } from '../../store/filters/selectors';
import { selectUser } from '../../store/login/selectors';
import './Menu.less';

const { TabPane } = Tabs;

const Menu: React.FC = () => {
    const [searchName, setSearchName] = useState('');
    const [searchArticle, setSearchArticle] = useState('');
    const [searchCategory, setSearchCategory] = useState('ALL');
    const [searchStatus, setSearchStatus] = useState(true);
    const [chooseStatus, setChooseStatus] = useState("оплачен");
    const [searchUser, setSearchUser] = useState('');
    const [searchNumber, setSearchNumber] = useState('');
    const user = useSelector(selectUser);
    const userTabs = useSelector(selectUserMenu);
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);
    return (
        <div className="menu__catalog">
            {user.role === "admin"
                ?
                <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="ТОВАРЫ" key="ТОВАРЫ">
                        <ProductsFilter setSearchName={setSearchName} setSearchArticle={setSearchArticle} setSearchCategory={setSearchCategory} setSearchStatus={setSearchStatus} />
                        <ProductsData searchName={searchName} searchArticle={searchArticle} searchCategory={searchCategory} searchStatus={searchStatus} />
                    </TabPane>
                    <TabPane tab="КАТЕГОРИИ" key="КАТЕГОРИИ">
                        <AdminCategory />
                    </TabPane>
                    <TabPane tab="ЗАКАЗЫ" key="ЗАКАЗЫ">
                        <OrderFilters setChooseStatus={setChooseStatus} setSearchUser={setSearchUser} setSearchNumber={setSearchNumber} />
                        <OrderData chooseStatus={chooseStatus} searchUser={searchUser} searchNumber={searchNumber} />
                    </TabPane>
                </Tabs>
                :
                <Tabs defaultActiveKey="1" type="card" onChange={(category: string) => {
                    dispatch({
                        type: FiltersActionTypes.SET_FILTERS,
                        ...filters,
                        category: category
                    })
                }}>
                    {
                        userTabs.map((item: string) => (
                            <TabPane tab={item.toUpperCase()} key={item.toLowerCase()} />
                        ))
                    }
                </Tabs>
            }
        </div>
    );
}

export default Menu;