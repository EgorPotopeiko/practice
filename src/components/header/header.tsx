import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import { PUBLIC_PATH, USER_PATH } from '../../routing/names';
import { GetFilters, RemoveAllFilters } from '../../store/filters/actions';
import { selectAllFilters } from '../../store/filters/selectors';
import { GetLogout } from '../../store/login/actions';
import { selectAuth, selectUser } from '../../store/login/selectors';
import { OpenModalAction } from '../../store/modals/actions';
import { GetPage, RemoveProductAction } from '../../store/products/actions';
import { selectPageSize } from '../../store/products/selectors';
import './header.less';

const { Title, Text } = Typography;

const { Option } = Select;

const { APP } = PUBLIC_PATH;

const { CART } = USER_PATH;

export const selectValues = ["Рога и копыта", "ZooParadise", "Purina", "RoyalConin", "Дружок", "Fisherman"];

const Header: React.FC = () => {
    const [searchInput, setSearchInput] = useState("");
    const pageSize = useSelector(selectPageSize);
    const dispatch = useDispatch();
    const { category, priceRange, search } = useSelector(selectAllFilters);
    const user = useSelector(selectUser);
    const isAuth = useSelector(selectAuth);
    return (
        <div className="header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title onClick={() => {
                        dispatch(RemoveProductAction())
                        localStorage.removeItem("product")
                        dispatch(RemoveAllFilters())
                        dispatch(GetPage(1, pageSize))
                    }}>
                        <Link to={APP}>Shop</Link></Title>
                    <div className='header__user'>
                        {(user.role === "guest" || user.role === "user") && (history.location.pathname === "/auth" || history.location.pathname === "/")
                            ?
                            <Input
                                suffix={<SearchOutlined onClick={() => dispatch(GetFilters(searchInput, priceRange, category))} />}
                                placeholder="Поиск по названию"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)} />
                            :
                            null
                        }
                        <Button onClick={() => {
                            user.role === "guest" && isAuth === false
                                ?
                                dispatch(OpenModalAction("Auth"))
                                :
                                dispatch(GetLogout({
                                    role: "guest"
                                }))
                            dispatch(RemoveAllFilters())
                            dispatch(GetPage(1, pageSize))
                        }}>{isAuth ? 'Выйти' : 'Войти'}
                        </Button>
                        <Link to={CART}><UserOutlined hidden={isAuth ? false : true} /></Link>
                    </div>
                </div>
                {(user.role === "guest" || user.role === "user") && (history.location.pathname === "/auth" || history.location.pathname === "/")
                    ?
                    <div className='header__filters'>
                        <>
                            <Input suffix={<SearchOutlined onClick={() => dispatch(GetFilters(searchInput, priceRange, category))} />} placeholder="Поиск по названию" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)} />
                            <Select placeholder="Производитель" mode="multiple">
                                {selectValues.map((item) => (<Option key={item} value={item}>{item.toUpperCase()}</Option>))}
                            </Select>
                        </>
                        <>
                            <Text>В наличии</Text>
                            <Switch defaultChecked />
                        </>
                        <>
                            <Text>Цена</Text>
                            <Slider range max={100000} defaultValue={[0, 100000]} onAfterChange={(newPriceRange: Array<number>) => dispatch(GetFilters(search, newPriceRange, category))} />
                        </>
                    </div>
                    :
                    null
                }
            </PageHeader>
        </div>
    );
}

export default Header;