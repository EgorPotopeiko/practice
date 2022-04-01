import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, List, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { addedCategory, removedCategory } from '../../../store/filters/actions';
import './AdminCategory.less'

const { Title } = Typography;

const AdminCategory: React.FC = () => {
    const listCategories = useSelector((state: RootStateOrAny) => state.filterReducer.listCategories);
    const [categoryName, setCategoryName] = useState('');
    const dispatch = useDispatch();

    const addCategory = () => {
        dispatch(addedCategory(categoryName))
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
                        <Input placeholder='Название новой категории' value={categoryName} onChange={(e: any) => setCategoryName(e.target.value)} />
                        <Button type='primary' onClick={addCategory}>Создать категорию</Button>
                    </Col>
                    <Col span={12}>
                        <List header={<div>Существующие категории</div>} bordered dataSource={listCategories} renderItem={(item: any) => <List.Item actions={[<DeleteOutlined onClick={() => dispatch(removedCategory(item))} />]}>{item}</List.Item>} />
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default AdminCategory;