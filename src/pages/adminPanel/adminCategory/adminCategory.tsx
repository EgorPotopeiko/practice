import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, List, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiltersActionTypes } from '../../../store/filters/action-types';
import { selectUserMenu } from '../../../store/filters/selectors';
import './AdminCategory.less'

const { Title } = Typography;

const AdminCategory: React.FC = () => {
    const categories = useSelector(selectUserMenu);
    const [categoryName, setCategoryName] = useState('');
    console.log(categoryName)
    const dispatch = useDispatch();
    const addCategory = () => {
        dispatch({
            type: FiltersActionTypes.ADDED_CATEGORY,
            category: categoryName
        })
        setCategoryName('')
    }
    return (
        <div className='adminCategory'>
            <Form>
                <Form.Item>
                    <Title level={3}>Добавление новой категории</Title>
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Input value={categoryName} onChange={(e: any) => setCategoryName(e.target.value)} placeholder='Название новой категории' />
                        <Button type='primary' onClick={addCategory}>Создать категорию</Button>
                    </Col>
                    <Col span={12}>
                        <List header={<div>Существующие категории</div>} bordered dataSource={categories} renderItem={(item: any) => <List.Item actions={[<DeleteOutlined onClick={() =>
                            dispatch({
                                type: FiltersActionTypes.DELETED_CATEGORY,
                                category: item
                            })
                        } />]}>{item}</List.Item>} />
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default AdminCategory;