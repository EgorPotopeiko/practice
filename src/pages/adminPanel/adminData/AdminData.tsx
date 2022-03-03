/* eslint-disable no-self-assign */
/* eslint-disable array-callback-return */
import { Table } from 'antd';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';


interface Props {
    searchName: any,
    searchArticle: any,
    searchCategory: any,
    searchStatus: any
}

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

const AdminData: React.FC<Props> = ({ searchArticle, searchCategory, searchName, searchStatus }) => {
    const dataSource = useSelector((state: RootStateOrAny) => state.productsReducer.products);
    dataSource.map((item: any) => {
        item['key'] = item.id.split('-')[0];
    })
    let newData = dataSource.filter((item: any) => item.title.toLowerCase().includes(searchName.toLowerCase()))
    newData = newData.filter((item: any) => item.key.toLowerCase().includes(searchArticle.toLowerCase()))
    if (searchCategory.toLowerCase() === "all") {
        newData = newData
    }
    else {
        newData = newData.filter((item: any) => item.category === searchCategory.toLowerCase())
    }
    newData = newData.filter((item: any) => item.available === searchStatus);
    console.log(newData)
    return (
        <div className="adminData">
            <Table dataSource={newData} columns={columns} rowSelection={{ type: "checkbox" }} />;
        </div>
    );
}

export default AdminData;