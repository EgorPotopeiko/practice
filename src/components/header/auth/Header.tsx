import { Button, Input, PageHeader, Typography } from 'antd';
import React from 'react';
import './Header.less';

const { Title } = Typography;

const Header: React.FC = () => {
    return (
        <div className="header">
            <PageHeader>
                <Title>Shop</Title>
                <div className='header__user'>
                    <Input placeholder="input search text" />
                    <Button>Выйти</Button>
                </div>
            </PageHeader>
        </div>
    );
}

export default Header;