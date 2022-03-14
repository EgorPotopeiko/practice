/* eslint-disable no-self-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Form, Typography, Select, InputNumber, Input } from 'antd';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TProduct } from '../../../../models/product';
import ProductsDB from '../../../../services';
import { deleteProduct, editProduct, setProducts } from '../../../../store/products/actions';
import "./ProductsData.less";

const { Option } = Select;

interface Props {
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
    record: TProduct;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

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
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const ProductData: React.FC<Props> = ({ searchArticle, searchCategory, searchName, searchStatus }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const database = new ProductsDB();
    const dataSource = useSelector((state: RootStateOrAny) => state.productsReducer.products);
    dataSource.map((item: TProduct) => {
        item['key'] = item.id.split('-')[0];
        item['status'] = item.available ? "Есть на складе" : "Нет на складе";
    })
    const [data, setData] = useState(dataSource);
    const [editingKey, setEditingKey] = useState('');
    let newData = data.filter((item: TProduct) => item.title.toLowerCase().includes(searchName.toLowerCase()))
    newData = newData.filter((item: TProduct) => item.key.toLowerCase().includes(searchArticle.toLowerCase()))
    if (searchCategory.toLowerCase() === "all") {
        newData = newData
    }
    else {
        newData = newData.filter((item: TProduct) => item.category === searchCategory.toLowerCase())
    }
    newData = newData.filter((item: TProduct) => item.available === searchStatus);
    const isEditing = (record: TProduct) => record.key === editingKey;

    const edit = (record: Partial<TProduct> & { key: React.Key }) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

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
                dispatch(editProduct(row.key, row.title, row.category))
                localStorage.setItem("products", JSON.stringify(newData))
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                dispatch(editProduct(row.key, row.title, row.category))
                localStorage.setItem("products", JSON.stringify(newData))
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    useEffect(() => {
        setData(dataSource)
    }, [dataSource])

    const columns = [
        {
            title: 'Название',
            dataIndex: 'title',
            key: 'title',
            editable: true
        },
        {
            title: 'Артикул',
            dataIndex: 'key',
            key: 'article',
            editable: true
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
            editable: true
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            editable: true
        },
        {
            title: 'Количество на складе',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Изменение',
            dataIndex: 'operation',
            render: (_: any, record: TProduct) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <EditOutlined disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </EditOutlined>
                        <DeleteOutlined onClick={() => {
                            dispatch(deleteProduct(record.key))
                        }} />
                    </>
                );
            },
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: TProduct) => ({
                record,
                selectType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <div className='products__data'>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={newData}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>
    );
};

export default ProductData