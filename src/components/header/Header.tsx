/* eslint-disable array-callback-return */
import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React, { useState } from 'react';
import './Header.less';
import ModalAuth from './ModalAuth/ModalAuth';

const { Title, Text } = Typography;

const { Option } = Select;

export const selectValues = ["Рога и копыта", "ZooParadise", "Purina", "RoyalConin", "Дружок", "Fisherman"];

const Header: React.FC = () => {
    const [modalAuthVisible, setModalAuthVisible] = useState(false);
    const showModal = () => {
        setModalAuthVisible(true);
    }
    return (
        <div className="header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title>Shop</Title>
                    <div className='header__user'>
                        <Input placeholder="input search text" />
                        <Button onClick={showModal}>Войти</Button>
                        <ModalAuth visible={modalAuthVisible} />
                    </div>
                </div>
                <div className='header__filters'>
                    <>
                        <Select placeholder="Производитель" mode="multiple">
                            {selectValues.map((item) => (
                                <Option key={item} value={item}>{item.toUpperCase()}</Option>
                            ))}
                        </Select>
                    </>
                    <>
                        <Text>В наличии</Text>
                        <Switch defaultChecked />
                    </>
                    <>
                        <Text>Цена</Text>
                        <Slider range max={100} defaultValue={[0, 100]} />
                    </>
                </div>
            </PageHeader>
        </div>
    );
}

export default Header;