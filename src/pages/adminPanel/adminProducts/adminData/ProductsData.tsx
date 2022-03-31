/* eslint-disable no-self-assign */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Form, Typography, Select, InputNumber, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TProduct } from '../../../../models/product';
import "./ProductsData.less";
import { selectPage, selectProducts, selectTotal } from '../../../../store/products/selectors';
import { selectUserMenu } from '../../../../store/filters/selectors';
import { ProductsActionTypes } from '../../../../store/products/action-types';

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
    selectType: 'text';
    record: TProduct;
    index: number;
    children: React.ReactNode;
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
    const listCategories = useSelector(selectUserMenu);
    const filterCategories = listCategories.filter((item: string) => item !== 'all')
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
                    {dataIndex === 'title' || dataIndex === 'key' ? inputNode :
                        dataIndex === 'category' ? categoryNode : null}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const ProductsData: React.FC<Props> = ({ searchArticle, searchCategory, searchName, searchStatus }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const page = useSelector(selectPage);
    const totalCount = useSelector(selectTotal)
    products.map((item: TProduct) => {
        item['key'] = item.id;
    })
    const [data, setData] = useState(products);
    const [editingKey, setEditingKey] = useState('');
    // let newData = data.filter((item: TProduct) => item.title.toLowerCase().includes(searchName.toLowerCase()))
    // newData = newData.filter((item: TProduct) => item.key.toLowerCase().includes(searchArticle.toLowerCase()))
    // if (searchCategory.toLowerCase() === "all") {
    //     newData = newData
    // }
    // else {
    //     newData = newData.filter((item: TProduct) => item.category === searchCategory.toLowerCase())
    // }
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
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
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
            dataIndex: 'key',
            key: 'article',
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
            editable: true
        },
        {
            title: 'Статус',
            dataIndex: 'available',
            key: 'available',
            render: (available: boolean) => (
                <span>Есть на складе</span>
            )
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
                        <Typography.Link onClick={() => {
                            save(record.key)
                        }} style={{ marginRight: 8 }}>
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
                        <DeleteOutlined onClick={() => dispatch({
                            type: ProductsActionTypes.DELETE_PRODUCT,
                            id: record.id
                        })} />
                    </>
                );
            },
        },
    ];

    const pagination = (page: Number, pageSize: Number) => dispatch({
        type: ProductsActionTypes.SET_PAGE,
        page,
        pageSize
    })

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
                editing: isEditing(record),
            }),
        };
    });
    useEffect(() => {
        setData(products)
    }, [products])
    console.log(totalCount)
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
                    dataSource={products}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: (page: number) => pagination(page, 6),
                        total: totalCount,
                        defaultCurrent: page,
                        pageSize: 6
                    }}
                />
            </Form>
        </div>
    );
};

export default ProductsData