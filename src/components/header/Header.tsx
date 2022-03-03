/* eslint-disable array-callback-return */
import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React, { ChangeEvent } from 'react';
import './Header.less';
import { useState } from 'react';
import { login, logout } from '../../store/auth/actions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { availableFilter, makerFilter, priceFilter, searchFilter } from '../../store/filters/actions';
import ProductsDB from '../../services';
import { userData } from '../../store/user/actions';
import ModalAuth from './ModalAuth/ModalAuth';
import ModalRegistration from './ModalRegistration/ModalRegistration';

const { Title, Text } = Typography;

const { Option } = Select;

const selectValues = ["Рога и копыта", "ZooParadise", "Purina", "RoyalConin", "Дружок", "Fisherman"];

const Header: React.FC = () => {
    const database = new ProductsDB();
    const dispatch = useDispatch();
    const auth = useSelector((state: RootStateOrAny) => state.authReducer.isAuth);
    const authEmail = useSelector((state: RootStateOrAny) => state.authReducer.email);
    const authPassword = useSelector((state: RootStateOrAny) => state.authReducer.password);
    const role = useSelector((state: RootStateOrAny) => state.userReducer.user.role);
    const available = useSelector((state: RootStateOrAny) => state.filterReducer.filterAvailable);
    const maker = useSelector((state: RootStateOrAny) => state.filterReducer.filterMaker);
    const search = useSelector((state: RootStateOrAny) => state.filterReducer.filterSearch);
    const priceRange = useSelector((state: RootStateOrAny) => state.filterReducer.filterPrice);
    const firstName = useSelector((state: RootStateOrAny) => state.userReducer.user.firstName);
    const lastName = useSelector((state: RootStateOrAny) => state.userReducer.user.lastName);
    const registrationUser = useSelector((state: RootStateOrAny) => state.registrationReducer.newUser.email);
    const [loading, setLoading] = useState(false);
    const [modalAuthVisible, setModalAuthVisible] = useState(false);
    const [modalRegVisible, setModalRegVisible] = useState(false);

    const showModal = () => {
        setModalAuthVisible(true);
        if (auth === true) {
            setModalAuthVisible(false);
            dispatch(logout(auth));
            dispatch(userData({ role: "guest" }))
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

    const handleReg = () => {
        console.log(`New user: ${registrationUser}`)
    };

    const changeForm = () => {
        setModalAuthVisible(false)
        setModalRegVisible(true)
    };

    const authProcess = () => {
        const even = (element: any) => element.email === authEmail;
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
                            dispatch(userData(authUser));
                        }
                        else {
                            setModalAuthVisible(false);
                        }
                    })
            })
    }
    return (
        <div className="header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title>Shop</Title>
                    <div className='header__user'>
                        <Input onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            dispatch(searchFilter(e.target.value))
                        }
                            placeholder="input search text"
                            value={search} />
                        <Button onClick={showModal}>{auth ? "Выйти" : "Войти"}</Button>
                        <Title level={4}>{firstName && `${firstName} ${lastName}`}</Title>
                        <ModalAuth modalAuthVisible={modalAuthVisible} onOk={handleAuth} loading={loading} changeForm={changeForm} />
                        <ModalRegistration modalRegVisible={modalRegVisible} onOk={handleReg} />
                    </div>
                </div>
                {role === "user" || role === "guest"
                    ?
                    (<div className='header__filters'>
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
                    </div>)
                    :
                    null
                }
            </PageHeader>
        </div>
    );
}

export default Header;