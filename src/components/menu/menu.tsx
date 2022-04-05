import { Tabs } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminCategory from '../../pages/admin_panel/admin_category';
import OrderData from '../../pages/admin_panel/admin_orders/admin_data';
import OrderFilters from '../../pages/admin_panel/admin_orders/filters';
import ProductsData from '../../pages/admin_panel/admin_products/admin_data';
import ProductsFilter from '../../pages/admin_panel/admin_products/filters';
import { GetFilters } from '../../store/filters/actions';
import { selectAllFilters, selectUserMenu } from '../../store/filters/selectors';
import { selectUser } from '../../store/login/selectors';
import './menu.less';

const { TabPane } = Tabs;

export type TMenuState = {
    searchName: string
    searchArticle: string
    searchCategory: 'ALL' | string
    searchStatus: boolean
    chooseStatus: "оплачен" | string
    searchUser: string
    searchNumber: string
}

const Menu: React.FC = () => {
    const [filter, setFilter] = useState<TMenuState>({
        searchName: '',
        searchArticle: '',
        searchCategory: 'ALL',
        searchStatus: true,
        chooseStatus: "оплачен",
        searchUser: "",
        searchNumber: "",
    });
    const [searchName, setSearchName] = useState('');
    const [searchArticle, setSearchArticle] = useState('');
    const [searchCategory, setSearchCategory] = useState('ALL');
    const [searchStatus, setSearchStatus] = useState(true);
    const [chooseStatus, setChooseStatus] = useState("оплачен");
    const [searchUser, setSearchUser] = useState('');
    const [searchNumber, setSearchNumber] = useState('');

    const handlerFilter = (type: keyof TMenuState) => (value: any) => {
        setFilter({
            ...filter,
            [type]: value
        })
    }

    const user = useSelector(selectUser);
    const userTabs = useSelector(selectUserMenu);
    const dispatch = useDispatch();
    const filters = useSelector(selectAllFilters);
    const { priceRange, search, sort } = filters;
    return (
        <div className="menu__catalog">
            {user.role === "admin"
                ?
                <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="ТОВАРЫ" key="ТОВАРЫ">
                        <ProductsFilter
                            handlerFilter={handlerFilter}
                            setSearchName={setSearchName}
                            setSearchArticle={setSearchArticle}
                            setSearchCategory={setSearchCategory}
                            setSearchStatus={setSearchStatus} />
                        <ProductsData
                            searchName={searchName}
                            searchArticle={searchArticle}
                            searchCategory={searchCategory}
                            searchStatus={searchStatus} />
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
                    dispatch(GetFilters(search, priceRange, sort, category))
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