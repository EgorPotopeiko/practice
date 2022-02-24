import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React from 'react';
import './Header.less';
import { isAuth } from '../../models/model';
import { role } from '../../models/model';

const { Title, Text } = Typography;

const { Option } = Select;

const selectValues = ["РОГА И КОПЫТА", "ZOOPARADISE", "PURINA"]

const Header: React.FC = () => {
    return (
        <div className="header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title>Shop</Title>
                    <div className='header__user'>
                        <Input placeholder="input search text" />
                        <Button>{isAuth ? "Выйти" : "Войти"}</Button>
                    </div>
                </div>
                {role === "USER"
                    ?
                    <div className='header__filters'>
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
                    </div>
                    :
                    <></>
                }
            </PageHeader>
        </div>
    );
}

export default Header;