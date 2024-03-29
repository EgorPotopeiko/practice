/* eslint-disable array-callback-return */
import { Table } from 'antd';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import CartHeader from '../../../../components/header/CartHeader/CartHeader';
import { TOrder } from '../../../../models/order';

const OrdersList: React.FC = () => {
    const ordersItems = useSelector((state: RootStateOrAny) => state.orderReducer.orders);
    const columns = [
        {
            title: 'Номер заказа',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'ФИО',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Адрес',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Доставка',
            dataIndex: 'delivery',
            key: 'delivery',
        },
        {
            title: 'Цена',
            dataIndex: 'payment',
            key: 'payment',
        },
    ];
    ordersItems.map((item: TOrder) => {
        item['key'] = item.id;
        item['address'] = `${item.town}, ул.${item.street}, ${item.house}`
        item['payment'] = `${item.payment} руб.`
    })
    return (
        <>
            <CartHeader />
            <Table dataSource={ordersItems} columns={columns} />
        </>
    )
}

export default OrdersList;