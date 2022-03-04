/* eslint-disable array-callback-return */
import { Checkbox, List, Table, Typography } from 'antd';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import './cartItems.less';

const columns = [
    {
        title: 'Название',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Категория',
        dataIndex: 'subcategory',
        key: 'subcategory',
    },
    {
        title: 'Количество',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Цена',
        dataIndex: 'cost',
        key: 'cost',
    }
];

const CartItems: React.FC = () => {
    const cartItems = useSelector((state: RootStateOrAny) => state.cartReducer.cartProducts);
    cartItems.map((item: any) => {
        item['key'] = item.id.split('-')[0];
        item['amount'] = 1;
    })
    return (
        <Table dataSource={cartItems} columns={columns} rowSelection={{ type: "checkbox" }} />
    )
}

export default CartItems;