/* eslint-disable array-callback-return */
import { Table } from 'antd';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

const columns = [
    {
        title: 'Название',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Артикул',
        dataIndex: 'key',
        key: 'article',
    },
    {
        title: 'Категория',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Статус',
        dataIndex: 'available',
        key: 'available',
    },
    {
        title: 'Количество на складе',
        dataIndex: 'amount',
        key: 'amount',
    }
];

const AdminData: React.FC = () => {
    const dataSource = useSelector((state: RootStateOrAny) => state.productsReducer.products);
    dataSource.map((item: any) => {
        item['key'] = item.id;
    })
    return (
        <div className="adminData">
            <Table dataSource={dataSource} columns={columns} rowSelection={{ type: "checkbox" }} />;
        </div>
    );
}

export default AdminData;