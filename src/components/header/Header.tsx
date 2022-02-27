import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React, { ChangeEvent } from 'react';
import './Header.less';
import { useState } from 'react';
import { login, logout } from '../../store/auth/authorization';
import { userRole, adminRole, guestRole } from '../../store/roles/roles';
import Modal from 'antd/lib/modal/Modal';
import { UserOutlined } from '@ant-design/icons';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { availableFilter, manufactureFilter, priceFilter, searchFilter } from '../../store/filters/filters';
import history from '../../history';
import { PUBLIC_PATH } from '../../routing/names';

const { Title, Text } = Typography;

const { Option } = Select;

const selectValues = ["РОГА И КОПЫТА", "ZOOPARADISE", "PURINA"];

const Header: React.FC = () => {
    const { ADMIN } = PUBLIC_PATH;
    const dispatch = useDispatch();
    const auth = useSelector((state: RootStateOrAny) => state.authReducer.isAuth);
    const role = useSelector((state: RootStateOrAny) => state.roleReducer.role);
    const available = useSelector((state: RootStateOrAny) => state.filterReducer.filterAvailable);
    // const manufacture = useSelector((state: RootStateOrAny) => state.filterReducer.filterManufacture)
    const search = useSelector((state: RootStateOrAny) => state.filterReducer.filterSearch);
    const priceRange = useSelector((state: RootStateOrAny) => state.filterReducer.filterPrice);
    const [loading, setLoading] = useState(false);
    const [loadingAdmin, setLoadingAdmin] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
        if (auth === true) {
            setModalVisible(false);
            dispatch(logout(auth));
            dispatch(guestRole(role));
        }
    }

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setModalVisible(false);
            dispatch(login(auth));
            dispatch(userRole(role));
        }, 3000)
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
    console.log(priceRange)
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
                        <Modal title="Authorization" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
                            <Button key="back" onClick={handleCancel}>Cancel</Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>Login</Button>,
                            <Button key="link" loading={loadingAdmin} onClick={handleAdmin} type="primary">Login as admin</Button>
                        ]}>
                            <div className='modal__inputs'>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="login" />
                                <Input.Password placeholder="password" />
                            </div>
                        </Modal>
                    </div>
                </div>
                {role === "USER"
                    &&
                    (<div className='header__filters'>
                        <>
                            <Select placeholder="Производитель" mode="multiple" onChange={(manufacture: object) => dispatch(manufactureFilter(manufacture))}>
                                {selectValues.map((item) => (
                                    <Option key={item} value={item}>{item}</Option>
                                ))}
                            </Select>
                        </>
                        <>
                            <Text>В наличии</Text>
                            <Switch onChange={() => dispatch(availableFilter(!available))} defaultChecked />
                        </>
                        <>
                            <Text>Цена</Text>
                            <Slider range max={20} defaultValue={priceRange} onChange={(priceRange) => dispatch(priceFilter(priceRange))} />
                        </>
                    </div>)
                }
            </PageHeader>
        </div>
    );
}

export default Header;