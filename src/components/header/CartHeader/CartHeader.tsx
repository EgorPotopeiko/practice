/* eslint-disable array-callback-return */
import { Button, Input, PageHeader, Typography } from 'antd';
import React from 'react';
import "./CartHeader.less"

const { Title } = Typography;

const CartHeader: React.FC = () => {
    return (
        <div className="cart__header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title>Shop</Title>
                    <div className='header__user'>
                        <Input placeholder="input search text" />
                        <Button>Выйти</Button>
                    </div>
                </div>
            </PageHeader>
        </div>
    );
}

export default CartHeader;