/* eslint-disable array-callback-return */
import { DeleteOutlined } from '@ant-design/icons';
import { Space, Table } from 'antd';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import './cartItems.less';
import { TProduct } from '../../../../models/product';

const CartItems: React.FC = () => {
    const cartItems = useSelector((state: RootStateOrAny) => state.cartReducer.cartProducts);
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
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: TProduct) => (
                <Space size="middle">
                    <DeleteOutlined />
                </Space>
            ),
        },
    ];
    cartItems.map((item: TProduct) => {
        item['key'] = item.id.split('-')[0];
    })
    return (
        <Table dataSource={cartItems} columns={columns} />
    )
}

export default CartItems;