import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React from 'react';
import './Header.less';
import { isAuth } from '../../models/model';
import { role } from '../../models/model';
import { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const { Option } = Select;

const selectValues = ["РОГА И КОПЫТА", "ZOOPARADISE", "PURINA"];

const Header: React.FC = () => {
    const [auth, setAuth] = useState(isAuth);
    const [roleUser, setRoleUser] = useState(role);
    const [loading, setLoading] = useState(false);
    const [loadingAdmin, setLoadingAdmin] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
        if (auth === true) {
            setModalVisible(false);
            setAuth(false);
        }
    }

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setModalVisible(false);
            setAuth(true);
        }, 3000)
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleAdmin = () => {
        setLoadingAdmin(true);
        setTimeout(() => {
            setRoleUser("ADMIN");
            setAuth(true);
            setLoadingAdmin(false);
            setModalVisible(false);
        }, 3000)
    }

    console.log(auth);
    console.log(roleUser);
    return (
        <div className="header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title>Shop</Title>
                    <div className='header__user'>
                        <Input placeholder="input search text" />
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
                            <Select placeholder="Производитель" mode="multiple">
                                {selectValues.map((item) => (
                                    <Option key={item} value={item}>{item}</Option>
                                ))}
                            </Select>
                        </>
                        <>
                            <Text>В наличии</Text>
                            <Switch defaultChecked />
                        </>
                        <>
                            <Text>Цена</Text>
                            <Slider range max={20} defaultValue={[0, 20]} />
                        </>
                    </div>)
                }
            </PageHeader>
        </div>
    );
}

export default Header;