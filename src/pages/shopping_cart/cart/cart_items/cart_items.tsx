/* eslint-disable array-callback-return */
import { DeleteOutlined } from '@ant-design/icons';
import { Space, Spin, Table } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './cart_items.less';
import { TProduct } from '../../../../models/product';
import { selectUser } from '../../../../store/login/selectors';
import { GetRemovedCartAction } from '../../../../store/cart/actions';
import { selectCart } from '../../../../store/cart/selectors';

type Props = {
    idProduct: number | undefined
}

const CartItems: React.FC<Props> = ({ idProduct }) => {
    const cartData = useSelector(selectCart)
    cartData.map((item: any) => {
        item['key'] = item.id
    })
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Название',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Категория',
            dataIndex: 'categories',
            key: 'categories',
            render: (_: any, record: any) => (
                <Space size='middle'>
                    <span>{record.categories.map((category: any) => {
                        return category.title + ' '
                    })}</span>
                </Space>
            )
        },
        {
            title: 'Количество',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Цена',
            dataIndex: 'total',
            key: 'total'
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: TProduct) => (
                <Space size="middle">
                    <DeleteOutlined onClick={() => dispatch(GetRemovedCartAction([{ id: record.id }], { id: record.id, title: record.title, price: record.price, categories: record.categories, img: record.img }))} />
                </Space>
            )
        },
    ];
    if (JSON.parse(localStorage.getItem(`orders ${user.name}`)!) === null) { localStorage.setItem(`orders ${user.name}`, JSON.stringify([])) }
    else { localStorage.getItem(`orders ${user.name}`) }
    return (
        <Spin spinning={idProduct === undefined ? true : false}>
            <Table
                bordered
                dataSource={cartData}
                columns={columns} />
        </Spin>

    )
}

export default CartItems;