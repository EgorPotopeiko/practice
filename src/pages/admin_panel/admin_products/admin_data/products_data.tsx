/* eslint-disable no-self-assign */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Form, Typography, Select, InputNumber, Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TProduct } from '../../../../models/product';
import './products_data.less';
import { selectProducts, selectTotal } from '../../../../store/products/selectors';
import { selectListCategories } from '../../../../store/category/selectors';
import { DeleteProductAction, GetPage } from '../../../../store/products/actions';
import { TCategory } from '../../../../models/category';

const { Option } = Select;

type Props = {
    searchName: string,
    searchArticle: string,
    searchCategory: string,
    searchStatus: boolean
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: 'text';
    inputType: 'number' | 'text';
    selectType: 'text';
    record: TProduct;
    index: number;
    children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    selectType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    const listCategories = useSelector(selectListCategories);
    const filterCategories = listCategories.filter((item: string) => item !== 'test');
    const categoryNode = <Select>
        {filterCategories.map((item: string) => (
            <Option key={item} value={item}>{item}</Option>
        ))}
    </Select>
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Заполните данные`,
                        },
                    ]}
                >
                    {dataIndex === 'title' || dataIndex === 'key' ? inputNode : dataIndex === 'category' ? categoryNode : null}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const ProductsData: React.FC<Props> = ({ searchArticle, searchCategory, searchName }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    products.map((item: TProduct) => { item['key'] = item.id.toString() });
    const totalCount = useSelector(selectTotal);
    const [data, setData] = useState(products);
    const [editingKey, setEditingKey] = useState('');
    let newData = data.filter((item: TProduct) => item.title.toLowerCase().includes(searchName.toLowerCase()));
    newData = newData.filter((item: TProduct) => item.id.toString().includes(searchArticle));
    newData = newData.filter((item: TProduct) => item.categories.find((element: TCategory) => element.title === searchCategory.toLowerCase()))
    const isEditing = (record: TProduct) => record.key === editingKey;

    const edit = (record: Partial<TProduct> & { key: React.Key }) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    const cancel = () => { setEditingKey('') };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as TProduct;
            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) { console.log('Validate Failed:', errInfo) }
    };

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
            title: 'Количество на складе',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'Изменение',
            dataIndex: 'operation',
            render: (_: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => { save(record.key) }} style={{ marginRight: 8 }}>Save</Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}><span>Cancel</span></Popconfirm>
                    </span>
                ) : (
                    <>
                        <EditOutlined disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</EditOutlined>
                        <DeleteOutlined onClick={() => dispatch(DeleteProductAction(record.id))} />
                    </>
                );
            }
        },
    ];

    const pagination = (page: number, pageSize: number) => dispatch(GetPage(page, pageSize))

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: TProduct) => ({
                record,
                inputType: 'text',
                selectType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record)
            }),
        };
    });
    useEffect(() => { setData(products) }, [products])
    return (
        <div className='products__data'>
            <Form form={form} component={false}>
                <Table
                    components={{ body: { cell: EditableCell } }}
                    bordered
                    dataSource={newData}
                    columns={mergedColumns}
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