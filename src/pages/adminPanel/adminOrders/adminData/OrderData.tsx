/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { Table, Popconfirm, Form, Typography, Select } from 'antd';
import { RootStateOrAny, useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import { TOrder } from '../../../../models/order';

const { Option } = Select;

interface Props {
    chooseStatus: string,
    searchUser: string,
    searchNumber: string
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: 'text';
    selectType: 'text';
    record: TOrder;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    selectType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = <Select defaultValue="оплачен">
        <Option value="оплачен">оплачен</Option>
        <Option value="в пути">в пути</Option>
        <Option value="доставлен">доставлен</Option>
        <Option value="оформлен">оформлен</Option>
    </Select>;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Выберите статус доставки!`,
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

const OrderData: React.FC<Props> = ({ chooseStatus, searchNumber, searchUser }) => {
    const [form] = Form.useForm();
    const dataSource = useSelector((state: RootStateOrAny) => state.orderReducer.orders);
    dataSource.map((item: TOrder) => {
        item['key'] = item.id;
        item['payment'] = `${item.payment}`;
    })
    const [data, setData] = useState(dataSource);
    const [editingKey, setEditingKey] = useState('');
    let filteredData = data.filter((item: TOrder) => item.user.toLowerCase().includes(searchUser.toLowerCase()))
    filteredData = filteredData.filter((item: TOrder) => item.id.toLowerCase().includes(searchNumber.toLowerCase()))
    filteredData = filteredData.filter((item: TOrder) => item.status === chooseStatus)
    const isEditing = (record: TOrder) => record.key === editingKey;

    const edit = (record: Partial<TOrder> & { key: React.Key }) => {
        form.setFieldsValue({ status: 'оплачен', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as TOrder;
            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                localStorage.removeItem("orders")
                localStorage.setItem("orders", JSON.stringify(newData))
                setEditingKey('');
            } else {
                newData.push(row);
                localStorage.removeItem("orders")
                localStorage.setItem("orders", JSON.stringify(newData))
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Номер заказа',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Пользователь',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Сумма заказа (руб.)',
            dataIndex: 'payment',
            key: 'payment',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            editable: true
        },
        {
            title: 'Доставка',
            dataIndex: 'delivery',
            key: 'delivery',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Изменение',
            dataIndex: 'operation',
            render: (_: any, record: TOrder) => {
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
                    <EditOutlined disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </EditOutlined>
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
            onCell: (record: TOrder) => ({
                record,
                selectType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={filteredData}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export default OrderData