/* eslint-disable array-callback-return */
import { Checkbox, List, Typography } from 'antd';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import './cartItems.less';

const CartItems: React.FC = () => {
    const cartItems = useSelector((state: RootStateOrAny) => state.cartReducer.cartProducts);
    return (
        <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item: any) => (
                <List.Item>
                    <List.Item.Meta
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={item.subcategory}
                    />
                </List.Item>
            )}
        />
    )
}

export default CartItems;