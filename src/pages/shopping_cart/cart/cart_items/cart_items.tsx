/* eslint-disable array-callback-return */
import { DeleteOutlined } from '@ant-design/icons';
import { Space, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './cart_items.less';
import { TProduct } from '../../../../models/product';
import { selectUser } from '../../../../store/login/selectors';
import { GetRemovedCartAction } from '../../../../store/cart/actions';
import ProductsDB from '../../../../services/products_service';

type Props = {
    idProduct: number | undefined
}

const CartItems: React.FC<Props> = ({ idProduct }) => {
    const [cartData, setCartData]: any[] = useState([]);
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
            render: () => (
                <span>1</span>
            )
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
    if (JSON.parse(localStorage.getItem(`orders ${user.name}`)!) === null) { localStorage.setItem(`orders ${user.name}`, JSON.stringify([])) }
    else { localStorage.getItem(`orders ${user.name}`) }
    useEffect(() => {
        if (idProduct !== undefined) {
            ProductsDB.getProduct(idProduct)
                .then((response: any) => response.data)
                .then((data: any) => setCartData([{ ...data }]))
        }
    }, [idProduct])
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