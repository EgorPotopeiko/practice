import { Tabs } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderData from '../../pages/adminPanel/adminOrders/adminData/OrderData';
import OrderFilters from '../../pages/adminPanel/adminOrders/filters/OrderFilters';
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
    const user = useSelector(selectUser)
    const userTabs = useSelector(selectUserMenu);
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);
    return (
        <div className="menu__catalog">
            <Tabs defaultActiveKey="1" type="card" onChange={(category: string) => dispatch({
                type: FiltersActionTypes.SET_FILTERS,
                ...filters,
                category: category
            })}>
                {user.role === "admin"
                    ?
                    <>
                        <TabPane tab="ТОВАРЫ" key="ТОВАРЫ"></TabPane>
                        <TabPane tab="КАТЕГОРИИ" key="КАТЕГОРИИ"></TabPane>
                        <TabPane tab="ЗАКАЗЫ" key="ЗАКАЗЫ">
                            <OrderFilters setChooseStatus={setChooseStatus} setSearchUser={setSearchUser} setSearchNumber={setSearchNumber} />
                            <OrderData chooseStatus={chooseStatus} searchUser={searchUser} searchNumber={searchNumber} />
                        </TabPane>
                    </>
                    :
                    userTabs.map((item: string) => (
                        <TabPane tab={item.toUpperCase()} key={item.toLowerCase()} />
                    ))
                }
            </Tabs>
        </div>
    );
}

export default Menu;