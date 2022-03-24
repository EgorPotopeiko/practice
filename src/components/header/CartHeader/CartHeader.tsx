/* eslint-disable array-callback-return */
import { UserOutlined } from '@ant-design/icons';
import { Button, PageHeader, Typography } from 'antd';
import React from 'react';
import "./CartHeader.less"

const { Title } = Typography;

const CartHeader: React.FC = () => {
    return (
        <div className="cart__header">
            <PageHeader>
                <div className='cart__header-wrap'>
                    <Title>Shop</Title>
                    <div className='cart__header-user'>
                        <Button>Выйти</Button>
                        <UserOutlined />
                    </div>
                </div>
            </PageHeader>
        </div>
    );
}

export default CartHeader;