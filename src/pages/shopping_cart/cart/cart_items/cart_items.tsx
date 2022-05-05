import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { Space, Spin, Table } from 'antd';
import { TProduct } from '../../../../models/product';
import { selectUserStatus } from '../../../../store/login/selectors';
import { GetRemovedCartAction } from '../../../../store/cart/actions';
import { selectCart } from '../../../../store/cart/selectors';
import './cart_items.less';

type Props = {
    idProduct: number | undefined
}

const CartItems: FC<Props> = ({ idProduct }) => {
    const cartData: Array<TProduct> = useSelector(selectCart);
    const { user } = useSelector(selectUserStatus);
    const dispatch = useDispatch();
    cartData.map((cartProduct: TProduct) => cartProduct['key'] = cartProduct.id.toString());
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
                    <DeleteOutlined onClick={() => dispatch(GetRemovedCartAction([{ id: record.id }]))} />
                </Space>
            )
        },
    ];
    if (JSON.parse(localStorage.getItem(`orders ${user.name}`)!) === null) localStorage.setItem(`orders ${user.name}`, JSON.stringify([]))
    else localStorage.getItem(`orders ${user.name}`)
    return (
        <Spin spinning={idProduct === undefined}>
            <Table
                bordered
                dataSource={cartData}
                columns={columns} />
        </Spin>

    )
}

export default CartItems;