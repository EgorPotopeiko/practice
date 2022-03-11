/* eslint-disable array-callback-return */
import { DeleteOutlined } from '@ant-design/icons';
import { Space, Table } from 'antd';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import './cartItems.less';
import { useDispatch } from 'react-redux';
import ProductsDB from '../../../../services';
import { removedToCart } from '../../../../store/cart/actions';
import { TProduct } from '../../../../models/product';

const CartItems: React.FC = () => {
    const cartItems = useSelector((state: RootStateOrAny) => state.cartReducer.cartProducts);
    const dispatch = useDispatch();
    const database = new ProductsDB();

    const loadProduct = (id: string) => {
        database.getProduct(id)
            .then((response) => {
                const newCartItem = {
                    id: response.id,
                    title: response.title,
                    cost: response.cost,
                    category: response.category,
                    subcategory: response.subcategory,
                }
                dispatch(removedToCart(newCartItem))
            })
    }
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
                    <DeleteOutlined onClick={() => loadProduct(record.id)} />
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