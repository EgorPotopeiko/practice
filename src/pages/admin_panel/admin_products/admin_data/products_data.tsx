import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Form, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { TProduct } from '../../../../models/product';
import { selectProductsStatus, selectTotal } from '../../../../store/products/selectors';
import { DeleteProductAction, GetPage } from '../../../../store/products/actions';
import { TCategory } from '../../../../models/category';
import { selectFiltersAdmin } from '../../../../store/filters_admin/selectors';
import './products_data.less';

const ProductsData: FC = () => {
    const { products, isLoading } = useSelector(selectProductsStatus);
    const totalCount = useSelector(selectTotal);
    const { searchArticle } = useSelector(selectFiltersAdmin);
    const [data, setData] = useState(products);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    let newData = data.filter((product: TProduct) => product.id.toString().includes(searchArticle));
    /* eslint-disable array-callback-return */
    const columns = [
        {
            title: 'Название',
            dataIndex: 'title',
            key: 'title',
            editable: true
        },
        {
            title: 'Артикул',
            dataIndex: 'id',
            key: 'article'
        },
        {
            title: 'Категория',
            dataIndex: 'categories',
            key: 'categories',
            editable: true,
            render: (_: any, record: TProduct) => (
                <Space size='middle'>
                    <span>{record.categories.map((category: TCategory) => {
                        return category.title + ' '
                    })}</span>
                </Space>
            )
        },
        {
            title: 'Статус',
            dataIndex: 'available',
            key: 'available',
            render: () => (<span>Есть на складе</span>)
        },
        {
            title: 'Изменение',
            dataIndex: 'operation',
            render: (_: any, record: any) => (
                <DeleteOutlined onClick={() => dispatch(DeleteProductAction(record.id))} />
            )
        }
    ];

    const pagination = (page: number, pageSize: number) => dispatch(GetPage(page, pageSize))

    useEffect(() => { setData(products) }, [products])
    return (
        <div className='products__data'>
            <Form form={form} component={false}>
                <Table
                    loading={isLoading}
                    bordered
                    dataSource={newData}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: (page: number) => pagination(page, 10),
                        total: totalCount,
                        pageSize: 10
                    }}
                />
            </Form>
        </div>
    );
};

export default ProductsData