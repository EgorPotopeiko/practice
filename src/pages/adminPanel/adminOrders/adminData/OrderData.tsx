/* eslint-disable no-self-assign */
/* eslint-disable array-callback-return */
import { Table } from 'antd';
import React from 'react';

const dataSource = [
    {
        key: "500",
        id: "500",
        user: "test",
        sum_order: 500,
        num_order: "№1294",
        status: "Оплачен",
        delivery: "Курьером",
        email: "test@mail.ru"
    },
    {
        key: "430",
        id: "430",
        user: "one more",
        sum_order: 125,
        num_order: "№127",
        status: "Оплачен",
        delivery: "Почтой",
        email: "oneone@mail.ru"
    },
    {
        key: "29",
        id: "29",
        user: "mari",
        sum_order: 42,
        num_order: "№297",
        status: "В пути",
        delivery: "Самовывоз",
        email: "mari@mail.ru"
    },
];

const columns = [
    {
        title: 'ID',
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
        dataIndex: 'sum_order',
        key: 'sum_order',
    },
    {
        title: 'Номер заказа',
        dataIndex: 'num_order',
        key: 'num_order',
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
    return (
        <div className="adminData">
            <Table dataSource={dataSource} columns={columns} rowSelection={{ type: "checkbox" }} />;
        </div>
    );
}

export default OrderData;