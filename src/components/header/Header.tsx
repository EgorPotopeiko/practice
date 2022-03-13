/* eslint-disable array-callback-return */
import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React, { ChangeEvent, useEffect } from 'react';
import './Header.less';
import { useState } from 'react';
import { login, logout } from '../../store/auth/actions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { availableFilter, makerFilter, priceFilter, searchFilter } from '../../store/filters/actions';
import ProductsDB from '../../services';
import ModalAuth from './ModalAuth/ModalAuth';
import { TUser } from '../../models/user';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AUTH_PATH, PUBLIC_PATH } from '../../routing/names';
import { userData } from '../../store/user/actions';

const { Title, Text } = Typography;

const { Option } = Select;

const { CART, AUTH } = AUTH_PATH;
const { ADMIN, APP, NOTFOUND } = PUBLIC_PATH

const selectValues = ["Рога и копыта", "ZooParadise", "Purina", "RoyalConin", "Дружок", "Fisherman"];

const Header: React.FC = () => {
    const database = new ProductsDB();
    const dispatch = useDispatch();
    const authEmail = useSelector((state: RootStateOrAny) => state.authReducer.email);
    const authPassword = useSelector((state: RootStateOrAny) => state.authReducer.password);
    const available = useSelector((state: RootStateOrAny) => state.filterReducer.filterAvailable);
    const maker = useSelector((state: RootStateOrAny) => state.filterReducer.filterMaker);
    const search = useSelector((state: RootStateOrAny) => state.filterReducer.filterSearch);
    const priceRange = useSelector((state: RootStateOrAny) => state.filterReducer.filterPrice);
    const user = useSelector((state: RootStateOrAny) => state.userReducer.user);
    const [loading, setLoading] = useState(false);
    const [modalAuthVisible, setModalAuthVisible] = useState(false);

    const showModal = () => {
        setModalAuthVisible(true);
        if (user.isAuth === true) {
            setModalAuthVisible(false);
            dispatch(logout(user.isAuth));
            dispatch(userData({ isAuth: false, role: "guest" }))
            localStorage.setItem("user", JSON.stringify({ isAuth: false, role: "guest" }))

        }
    }

    const handleAuth = () => {
        setLoading(true);
        setTimeout(() => {
            if (authEmail.length === 0 && authPassword.length === 0) {
                setLoading(false)
            }
            else {
                authProcess()
                setLoading(false)
            }
        }, 3000)
    };

    const closeAuthForm = () => {
        setModalAuthVisible(false)
    };

    const authProcess = () => {
        const even = (element: TUser) => element.email === authEmail;
        database.getAllUsers()
            .then((response) => response.find(even))
            .then((value) => value.id)
            .then((id) => {
                database.getUser(id)
                    .then((response) => response)
                    .then((item) => {
                        const { id, firstName, lastName, password, email, role } = item;
                        if (password === authPassword) {
                            dispatch(login(true));
                            const authUser = {
                                id,
                                firstName,
                                lastName,
                                password,
                                email,
                                role
                            }
                            dispatch(userData({ isAuth: true, ...authUser }))
                            localStorage.setItem("user", JSON.stringify({ isAuth: true, ...authUser }))
                            setModalAuthVisible(false)
                        }
                        else {
                            setModalAuthVisible(false);
                        }
                    })
            })
    }
    useEffect(() => {
        localStorage.getItem("user");
    }, [])
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user])
    return (
        <div className="header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title><Link to={user.role === 'guest' ? APP : user.role === 'user' ? AUTH : user.role === 'admin' ? ADMIN : NOTFOUND}>Shop</Link></Title>
                    <div className='header__user'>
                        <Input onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            dispatch(searchFilter(e.target.value))
                        }
                            placeholder="input search text"
                            value={search} />
                        <Button onClick={showModal}>{user.isAuth ? "Выйти" : "Войти"}</Button>
                        <Link to={CART}>{user.isAuth ? <UserOutlined /> : null}</Link>
                        <ModalAuth modalAuthVisible={modalAuthVisible} onOk={handleAuth} loading={loading} onCancel={closeAuthForm} />
                    </div>
                </div>
                <div className='header__filters'>
                    <>
                        <Select value={maker} placeholder="Производитель" mode="multiple" onChange={(maker: string) => dispatch(makerFilter(maker))} >
                            {selectValues.map((item) => (
                                <Option key={item} value={item}>{item.toUpperCase()}</Option>
                            ))}
                        </Select>
                    </>
                    <>
                        <Text>В наличии</Text>
                        <Switch onChange={() => dispatch(availableFilter(!available))} defaultChecked />
                    </>
                    <>
                        <Text>Цена</Text>
                        <Slider range max={100} defaultValue={priceRange} onChange={(priceRange) => dispatch(priceFilter(priceRange))} />
                    </>
                </div>
            </PageHeader>
        </div>
    );
}

export default Header;