/* eslint-disable no-self-assign */
/* eslint-disable array-callback-return */
import { Table } from 'antd';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

const columns = [
    {
        title: 'Номер заказа',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Пользователь',
        dataIndex: 'user',
        key: 'user',
    },
    {
        title: 'Сумма заказа',
        dataIndex: 'payment',
        key: 'payment',
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Доставка',
        dataIndex: 'delivery',
        key: 'delivery',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    }
];

const OrderData: React.FC = () => {
    const dataSource = useSelector((state: RootStateOrAny) => state.orderReducer.orders);
    dataSource.map((item: any) => {
        item['key'] = item.id;
        item['payment'] = `${item.payment} руб.`;
        item['delivery'] = item.delivery === 'courier' ? "курьером" : item.delivery === 'mail' ? "почтой" : item.delivery === 'self' ? "самовывоз" : "";
    })
    return (
        <div className="adminData">
            <Table dataSource={dataSource} columns={columns} rowSelection={{ type: "checkbox" }} />;
        </div>
    );
}

export default OrderData;