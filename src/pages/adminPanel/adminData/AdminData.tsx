import { Table } from 'antd';
import React from 'react';


const dataSource = [
    {
        key: '1',
        name: 'Резиновый мячик',
        article: 505,
        category: 'Игрушки',
        status: 'В наличии',
        amount: 12,
    },
    {
        key: '2',
        name: 'Корм',
        article: 123001213,
        category: 'Корм',
        status: 'Нет на складе',
        amount: 0,
    },
    {
        key: '3',
        name: 'Фильтр',
        article: 3049324,
        category: 'Фильтр',
        status: 'В наличии',
        amount: 20,
    },
];

const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Артикул',
        dataIndex: 'article',
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
    return (
        <div className="adminData">
            <Table dataSource={dataSource} columns={columns} rowSelection={{ type: "checkbox" }} />;
        </div>
    );
}

export default AdminData;