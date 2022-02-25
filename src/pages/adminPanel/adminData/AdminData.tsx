import { Table } from 'antd';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
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
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Количество на складе',
        dataIndex: 'amount',
        key: 'amount',
    }
];

const AdminData: React.FC = () => {
    const dataSource = useSelector((state: RootStateOrAny) => state.productsReducer.products);
    return (
        <div className="adminData">
            <Table dataSource={dataSource} columns={columns} rowSelection={{ type: "checkbox" }} />;
        </div>
    );
}

export default AdminData;