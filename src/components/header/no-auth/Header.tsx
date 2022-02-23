import { Button, Checkbox, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React from 'react';
import './Header.less';

const { Title, Text } = Typography;

const { Option } = Select;


const Header: React.FC = () => {
    return (
        <div className="header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title>Shop</Title>
                    <div className='header__user'>
                        <Input placeholder="input search text" />
                        <Button>Войти</Button>
                    </div>
                </div>
                <div className='header__filters'>
                    <>
                        <Select placeholder="Производитель">
                            <Option value="Horns and hooves"><Checkbox>Рога и копыта</Checkbox></Option>
                            <Option value="ZooParadise"><Checkbox>ZooParadise</Checkbox></Option>
                            <Option value="Purina"><Checkbox>Purina</Checkbox></Option>
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
            </PageHeader>
        </div>
    );
}

export default Header;