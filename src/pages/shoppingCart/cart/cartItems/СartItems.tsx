/* eslint-disable array-callback-return */
import { DeleteOutlined } from '@ant-design/icons';
import { Space, Table } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CartItems.less';
import { TProduct } from '../../../../models/product';
import { selectCart } from '../../../../store/cart/selectors';
import { CartActionTypes } from '../../../../store/cart/action-types';

const CartItems: React.FC = () => {
    const cartItems = useSelector(selectCart);
    const dispatch = useDispatch()
    const columns = [
        {
            title: 'Название',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
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
                    <DeleteOutlined onClick={() =>
                        dispatch({
                            type: CartActionTypes.PRODUCT_REMOVED,
                            item: record
                        })
                    } />
                </Space>
            ),
        },
    ];
    cartItems.map((item: TProduct) => {
        item['key'] = item.id;
    })
    return (
        <Table dataSource={cartItems} columns={columns} />
    )
}

export default CartItems;