import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Table, Form } from 'antd';
import { TOrder } from '../../../../models/order';
import { selectFiltersAdmin } from '../../../../store/filters_admin/selectors';
import './order_data.less';

const OrderData: FC = () => {
    const { chooseStatus, searchNumber, searchUser } = useSelector(selectFiltersAdmin);
    let orders: Array<TOrder> = [];
    const [form] = Form.useForm();
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i) || "";
        if (key.includes("orders")) {
            let result = JSON.parse(localStorage.getItem(key)!);
            orders = [...orders, ...result];
        }
    }
    let filteredData = orders.filter((order: TOrder) => order.user.includes(searchUser))
    filteredData = filteredData.filter((order: TOrder) => order.id.includes(searchNumber))
    filteredData = filteredData.filter((order: TOrder) => order.status === chooseStatus)
    const columns = [
        {
            title: 'Номер заказа',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Пользователь',
            dataIndex: 'user',
            key: 'user'
        },
        {
            title: 'Сумма заказа (руб.)',
            dataIndex: 'payment',
            key: 'payment'
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            editable: true
        },
        {
            title: 'Доставка',
            dataIndex: 'delivery',
            key: 'delivery'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
    ];
    return (
        <div className='orders__data'>
            <Form form={form} component={false}>
                <Table
                    bordered
                    dataSource={filteredData}
                    columns={columns}
                    rowClassName="editable-row"
                />
            </Form>
        </div>
    );
};

export default OrderData