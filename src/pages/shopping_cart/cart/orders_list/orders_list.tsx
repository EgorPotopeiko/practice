/* eslint-disable array-callback-return */
import { Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../../../components/header';
import { TOrder } from '../../../../models/order';
import { selectUserStatus } from '../../../../store/login/selectors';

const OrdersList: React.FC = () => {
    const { user } = useSelector(selectUserStatus);
    const ordersItems = JSON.parse(localStorage.getItem(`orders ${user.name}`)!);
    const columns = [
        {
            title: 'Номер заказа',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'ФИО',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Адрес',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Доставка',
            dataIndex: 'delivery',
            key: 'delivery'
        },
        {
            title: 'Цена',
            dataIndex: 'payment',
            key: 'payment'
        },
    ];
    ordersItems.map((order: TOrder) => {
        order['key'] = order.id;
        order['address'] = `${order.town}, ул.${order.street}, ${order.house}`;
        order['payment'] = `${order.payment} руб.`;
    })
    return (
        <>
            <Header />
            <Table dataSource={ordersItems} columns={columns} />
        </>
    )
}

export default OrdersList;