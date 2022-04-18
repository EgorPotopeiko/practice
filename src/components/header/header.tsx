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

export const selectValues = ["Рога и копыта", "ZooParadise", "Purina", "RoyalConin", "Дружок", "Fisherman"];

const Header: React.FC = () => {
    const [searchInput, setSearchInput] = useState("");
    const pageSize = useSelector(selectPageSize);
    const dispatch = useDispatch();
    const { category, price, search } = useSelector(selectAllFilters);
    const user = useSelector(selectUser);
    const isAuth = useSelector(selectAuth);
    return (
        <div className="header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title onClick={() => {
                        dispatch(RemoveProductAction())
                        dispatch(RemoveAllFilters())
                        dispatch(GetPage(1, pageSize))
                    }}>
                        <Link to={PUBLIC_PATH.APP}>Shop</Link></Title>
                    <div className='header__user'>
                        {(user.role.toLowerCase() === "guest" || user.role.toLowerCase() === "user") && (history.location.pathname === "/auth" || history.location.pathname === "/")
                            ?
                            <Input
                                suffix={<SearchOutlined onClick={() => dispatch(GetFilters(searchInput, price, category))} />}
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
                        }}>{isAuth ? 'Выйти' : 'Войти'}
                        </Button>
                        <Link to={USER_PATH.CART}><UserOutlined hidden={isAuth ? false : true} /></Link>
                    </div>
                </div>
                {(user.role.toLowerCase() === "guest" || user.role.toLowerCase() === "user") && (history.location.pathname === "/auth" || history.location.pathname === "/")
                    ?
                    <div className='header__filters'>
                        <>
                            <Input
                                suffix={<SearchOutlined
                                    onClick={() => dispatch(GetFilters(searchInput, price, category))} />}
                                placeholder="Поиск по названию"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)} />
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
                            <Slider range max={5000} defaultValue={[0, 5000]} onAfterChange={(newPrice: Array<number>) => dispatch(GetFilters(search, newPrice, category))} />
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