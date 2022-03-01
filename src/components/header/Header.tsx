import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React, { ChangeEvent } from 'react';
import './Header.less';
import { useState } from 'react';
import { login, logout, setEmail, setPassword } from '../../store/auth/actions';
import { userRole, adminRole, guestRole } from '../../store/roles/actions';
import Modal from 'antd/lib/modal/Modal';
import { UserOutlined } from '@ant-design/icons';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { availableFilter, makerFilter, priceFilter, searchFilter } from '../../store/filters/actions';
import history from '../../history';
import { PUBLIC_PATH } from '../../routing/names';
import ProductsDB from '../../services';
import { userData } from '../../store/user/actions';

const { Title, Text } = Typography;

const { Option } = Select;

const selectValues = ["Рога и копыта", "ZooParadise", "Purina", "RoyalConin", "Дружок", "Fisherman"];

const Header: React.FC = () => {
    const { APP, ADMIN } = PUBLIC_PATH;
    const database = new ProductsDB();
    const dispatch = useDispatch();
    const auth = useSelector((state: RootStateOrAny) => state.authReducer.isAuth);
    const email = useSelector((state: RootStateOrAny) => state.authReducer.email);
    const password = useSelector((state: RootStateOrAny) => state.authReducer.password);
    const role = useSelector((state: RootStateOrAny) => state.roleReducer.role);
    const available = useSelector((state: RootStateOrAny) => state.filterReducer.filterAvailable);
    const maker = useSelector((state: RootStateOrAny) => state.filterReducer.filterMaker);
    const search = useSelector((state: RootStateOrAny) => state.filterReducer.filterSearch);
    const priceRange = useSelector((state: RootStateOrAny) => state.filterReducer.filterPrice);
    const firstName = useSelector((state: RootStateOrAny) => state.userReducer.user.firstName);
    const [loading, setLoading] = useState(false);
    const [loadingAdmin, setLoadingAdmin] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
        if (auth === true) {
            setModalVisible(false);
            dispatch(logout(auth));
            dispatch(guestRole(role));
            dispatch(userData("", "", "", "", "", ""))
            history.push(APP);
        }
    }

    const handleOk = () => {
        setLoading(true);
        authProcess()
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleAdmin = () => {
        setLoadingAdmin(true);
        setTimeout(() => {
            dispatch(login(auth));
            dispatch(adminRole(role));
            setLoadingAdmin(false);
            setModalVisible(false);
            history.push(ADMIN);
        }, 3000)
    }

    const authProcess = () => {
        database.getAllUsers()
            .then((response) => response.map((item: any) => {
                if (item.email === email && item.password === password) {
                    setTimeout(() => {
                        setLoading(false);
                        setModalVisible(false);
                        dispatch(login(auth));
                        dispatch(userRole(role));
                        dispatch(userData(item.id, item.firstName, item.lastName, item.password, item.email, item.role))
                    }, 3000)

                }
                else {
                    setLoading(true);
                    setModalVisible(true);
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
                        <Title level={4}>{firstName && `${firstName}`}</Title>
                        <Modal title="Authorization" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
                            <Button key="back" onClick={handleCancel}>Cancel</Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>Login</Button>,
                            <Button key="link" loading={loadingAdmin} onClick={handleAdmin} type="primary">Login as admin</Button>
                        ]}>
                            <div className='modal__inputs'>
                                <Input type="email" onChange={(e) => dispatch(setEmail(e.target.value))} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                                <Input.Password onChange={(e) => dispatch(setPassword(e.target.value))} placeholder="password" />
                            </div>
                        </Modal>
                    </div>
                </div>
                {role === "USER" || role === "GUEST"
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