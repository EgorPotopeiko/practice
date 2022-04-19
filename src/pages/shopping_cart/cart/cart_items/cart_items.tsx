/* eslint-disable array-callback-return */
import { DeleteOutlined } from '@ant-design/icons';
import { Space, Spin, Table } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './cart_items.less';
import { TProduct } from '../../../../models/product';
import { selectUserStatus } from '../../../../store/login/selectors';
import { GetRemovedCartAction } from '../../../../store/cart/actions';
import { selectCart } from '../../../../store/cart/selectors';

type Props = {
    idProduct: number | undefined
}

const CartItems: React.FC<Props> = ({ idProduct }) => {
    const cartData = useSelector(selectCart);
    const { user } = useSelector(selectUserStatus);
    const dispatch = useDispatch();
    cartData.map((cartProduct: any) => {
        cartProduct['key'] = cartProduct.id
    })
    const columns = [
        {
            title: 'Название',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: TProduct) => (
                <Space size="middle">
                    <DeleteOutlined onClick={() => {
                        dispatch(GetRemovedCartAction([{ id: record.id }]))
                    }} />
                </Space>
            )
        },
    ];
    if (JSON.parse(localStorage.getItem(`orders ${user.name}`)!) === null) localStorage.setItem(`orders ${user.name}`, JSON.stringify([]))
    else localStorage.getItem(`orders ${user.name}`)
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