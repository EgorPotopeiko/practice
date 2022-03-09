/* eslint-disable array-callback-return */
import { Table } from 'antd';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import CartHeader from '../../../../components/header/CartHeader/CartHeader';

const OrdersList: React.FC = () => {
    const ordersItems = useSelector((state: RootStateOrAny) => state.orderReducer.orders);
    console.log(ordersItems)
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
            dataIndex: 'total',
            key: 'total',
        },
    ];
    ordersItems.map((item: any) => {
        item['key'] = item.id;
        item['address'] = `${item.town}, ${item.street}, ${item.house}`
        item['delivery'] = item.delivery === 'courier' ? "курьером" : item.delivery === 'mail' ? "почтой" : item.delivery === 'self' ? "самовывоз" : null
    })
    return (
        <>
            <CartHeader />
            <Table dataSource={ordersItems} columns={columns} />
        </>
    )
}

export default OrdersList;