import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, List, Row, Typography } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserMenu } from '../../../store/filters/selectors';
import './admin_category.less'
import { addedCategory, removedCategory } from "../../../store/filters/actions";

const { Title } = Typography;

const AdminCategory: React.FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectUserMenu);
    const [categoryName, setCategoryName] = useState<string>('');

    const addCategory = () => {
        dispatch(addedCategory(categoryName))
        setCategoryName('')
    }
    return (
        <div className='admin__category'>
            <Form>
                <Form.Item>
                    <Title level={2}>Добавление новой категории</Title>
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Input value={categoryName} onChange={(e: ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)} placeholder='Название новой категории' />
                        <Button type='primary' onClick={addCategory}>Создать категорию</Button>
                    </Col>
                    <Col span={12}>
                        <List header={<div>Существующие категории</div>} bordered dataSource={categories} renderItem={(item: string) => <List.Item actions={[<DeleteOutlined onClick={() =>
                            dispatch(removedCategory(item))
                        } />]}>{item}</List.Item>} />
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default AdminCategory;