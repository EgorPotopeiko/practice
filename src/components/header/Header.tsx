/* eslint-disable array-callback-return */
import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React, { ChangeEvent } from 'react';
import './Header.less';
import { useState } from 'react';
import { login, logout, setEmail, setPassword } from '../../store/auth/actions';
import Modal from 'antd/lib/modal/Modal';
import { UserOutlined } from '@ant-design/icons';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { availableFilter, makerFilter, priceFilter, searchFilter } from '../../store/filters/actions';
import ProductsDB from '../../services';
import { userData } from '../../store/user/actions';

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
    const [loading, setLoading] = useState(false);
    const [modalAuthVisible, setModalAuthVisible] = useState(false);
    const [modalErrorVisible, setModalErrorVisible] = useState(false);

    const showModal = () => {
        setModalAuthVisible(true);
        if (auth === true) {
            setModalAuthVisible(false);
            dispatch(logout(auth));
            dispatch(userData({ role: "guest" }))
        }
    }

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            authProcess()
            setLoading(false)
        }, 3000)
    };

    const handleCancel = () => {
        setModalAuthVisible(false);
        setModalErrorVisible(false);
    };

    const handleBack = () => {
        setModalErrorVisible(false);
        setModalAuthVisible(true);
    };
    const authProcess = () => {
        database.getAllUsers()
            .then((response) => response.map((item: any) => {
                if (authEmail === item.email) {
                    if (authPassword === item.password) {
                        const { id, firstName, lastName, password, email, role } = item;
                        setModalErrorVisible(false);
                        setLoading(false);
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
                        setModalAuthVisible(false);
                    }
                    else {
                        setLoading(false);
                        setModalAuthVisible(false);
                    }
                }
            }))
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
                        <Modal title="Authorization" visible={modalAuthVisible} onOk={handleOk} onCancel={handleCancel} footer={[
                            <Button key="back" onClick={handleCancel}>Cancel</Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>Login</Button>,
                        ]}>
                            <div className='modal__inputs'>
                                <Input type="email" onChange={(e) => dispatch(setEmail(e.target.value))} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                                <Input.Password onChange={(e) => dispatch(setPassword(e.target.value))} placeholder="password" />
                            </div>
                        </Modal>
                        <Modal title="Error" visible={modalErrorVisible} footer={[
                            <Button key="back" onClick={handleCancel}>Close</Button>,
                            <Button key="submit" type="primary" onClick={handleBack}>Go back</Button>,
                        ]}>
                            <Title level={3}>Incorrect email or password</Title>
                        </Modal>
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