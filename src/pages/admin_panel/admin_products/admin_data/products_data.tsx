import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Popconfirm, Form, Typography, Select, InputNumber, Input, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TProduct } from '../../../../models/product';
import { selectProductsStatus, selectTotal } from '../../../../store/products/selectors';
import { selectListCategories } from '../../../../store/category/selectors';
import { DeleteProductAction, GetPage } from '../../../../store/products/actions';
import { TCategory } from '../../../../models/category';
import './products_data.less';
import { selectFiltersAdmin } from '../../../../store/filters_admin/selectors';

const { Option } = Select;

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

const EditableCell: FC<EditableCellProps> = ({
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
    const filterCategories = listCategories.filter((category: string) => category !== '');
    const categoryNode = <Select>
        {filterCategories.map((category: string) => <Option key={category} value={category}>{category}</Option>)}
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

const ProductsData: FC = () => {
    const { products, isLoading } = useSelector(selectProductsStatus);
    const totalCount = useSelector(selectTotal);
    const { searchArticle } = useSelector(selectFiltersAdmin);
    const [data, setData] = useState(products);
    const [editingKey, setEditingKey] = useState('');
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    let newData = data.filter((product: TProduct) => product.id.toString().includes(searchArticle));
    /* eslint-disable array-callback-return */
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
            const index = newData.findIndex(product => key === product.key);
            if (index > -1) {
                const product = newData[index];
                newData.splice(index, 1, {
                    ...product,
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
        if (!col.editable) return col;
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
                    loading={isLoading}
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