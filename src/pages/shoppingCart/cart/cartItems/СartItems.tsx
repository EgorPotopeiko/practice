/* eslint-disable array-callback-return */
import { DeleteOutlined } from '@ant-design/icons';
import { Space, Table } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CartItems.less';
import { TProduct } from '../../../../models/product';
import { selectCart } from '../../../../store/cart/selectors';
import { CartActionTypes } from '../../../../store/cart/action-types';
import { selectUser } from '../../../../store/login/selectors';

const CartItems: React.FC = () => {
    const cartItems = useSelector(selectCart);
    const user = useSelector(selectUser);
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
    if (JSON.parse(localStorage.getItem(`orders ${user.name}`)!) === null) {
        localStorage.setItem(`orders ${user.name}`, JSON.stringify([]))
    }
    else {
        localStorage.getItem(`orders ${user.name}`)
    }
    return (
        <Table bordered dataSource={cartItems} columns={columns} />
    )
}

export default CartItems;