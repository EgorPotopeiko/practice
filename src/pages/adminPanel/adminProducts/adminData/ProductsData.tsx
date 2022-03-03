/* eslint-disable no-self-assign */
/* eslint-disable array-callback-return */
import { Table } from 'antd';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { TProduct } from '../../../../models/product';

interface Props {
    searchName: string,
    searchArticle: string,
    searchCategory: string,
    searchStatus: boolean
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
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Количество на складе',
        dataIndex: 'amount',
        key: 'amount',
    }
];

const ProductsData: React.FC<Props> = ({ searchArticle, searchCategory, searchName, searchStatus }) => {
    const dataSource = useSelector((state: RootStateOrAny) => state.productsReducer.products);
    dataSource.map((item: any) => {
        item['key'] = item.id.split('-')[0];
        item['status'] = item.available ? "Есть на складе" : "Нет на складе";
    })
    let newData = dataSource.filter((item: TProduct) => item.title.toLowerCase().includes(searchName.toLowerCase()))
    newData = newData.filter((item: any) => item.key.toLowerCase().includes(searchArticle.toLowerCase()))
    if (searchCategory.toLowerCase() === "all") {
        newData = newData
    }
    else {
        newData = newData.filter((item: TProduct) => item.category === searchCategory.toLowerCase())
    }
    newData = newData.filter((item: TProduct) => item.available === searchStatus);
    return (
        <div className="adminData">
            <Table dataSource={newData} columns={columns} rowSelection={{ type: "checkbox" }} />;
        </div>
    );
}

export default ProductsData;