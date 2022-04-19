import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import { PUBLIC_PATH, USER_PATH } from '../../routing/names';
import { GetFilters } from '../../store/filters/actions';
import { selectFilters } from '../../store/filters/selectors';
import { GetLogout } from '../../store/login/actions';
import { selectUserStatus } from '../../store/login/selectors';
import { OpenModalAction } from '../../store/modals/actions';
import { RemoveProductAction, ResetProducts } from '../../store/products/actions';
import './header.less';

const { Title, Text } = Typography;

const { Option } = Select;

const Header: React.FC = () => {
    const { category, price, search } = useSelector(selectFilters);
    const { user, isAuth } = useSelector(selectUserStatus);
    const [searchInput, setSearchInput] = useState("");
    const dispatch = useDispatch();
    return (
        <div className="header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title onClick={() => {
                        dispatch(RemoveProductAction())
                        dispatch(ResetProducts())
                    }}>
                        <Link to={PUBLIC_PATH.APP}>Shop</Link></Title>
                    <div className='header__user'>
                        {user.role !== "ADMIN" &&
                            (history.location.pathname === "/auth" || history.location.pathname === "/") &&
                            <Input
                                suffix={<SearchOutlined onClick={() => dispatch(GetFilters(searchInput, price, category))} />}
                                placeholder="Поиск по названию"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)} />
                        }
                        <Button onClick={() => {
                            user.role === "GUEST" && !isAuth
                                ?
                                dispatch(OpenModalAction("Auth"))
                                :
                                dispatch(GetLogout({
                                    role: "GUEST"
                                }))
                        }}>{isAuth ? 'Выйти' : 'Войти'}
                        </Button>
                        <Link to={USER_PATH.CART}><UserOutlined hidden={!isAuth} /></Link>
                    </div>
                </div>
                {user.role !== "ADMIN" &&
                    (history.location.pathname === "/auth" || history.location.pathname === "/") &&
                    <div className='header__filters'>
                        <>
                            <Input
                                suffix={<SearchOutlined
                                    onClick={() => dispatch(GetFilters(searchInput, price, category))} />}
                                placeholder="Поиск по названию"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)} />
                            <Select placeholder="Производитель" mode="multiple">
                                <Option>1</Option>
                                <Option>2</Option>
                                <Option>3</Option>
                            </Select>
                        </>
                        <>
                            <Text>В наличии</Text>
                            <Switch defaultChecked />
                        </>
                        <>
                            <Text>Цена</Text>
                            <Slider
                                range max={5000}
                                defaultValue={[0, 5000]}
                                onAfterChange={(newPrice: Array<number>) => dispatch(GetFilters(search, newPrice, category))} />
                        </>
                    </div>
                }
            </PageHeader>
        </div>
    );
}

export default Header;