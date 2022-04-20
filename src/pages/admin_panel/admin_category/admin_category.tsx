import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, List, Row, Typography } from 'antd';
import { OpenModalAction } from '../../../store/modals/actions';
import { selectListCategories } from '../../../store/category/selectors';
import { DeleteCategoryAction } from '../../../store/category/actions';
import { TCategory } from '../../../models/category';
import './admin_category.less';

const { Title } = Typography;

const AdminCategory: React.FC = () => {
    const categories = useSelector(selectListCategories);
    const dispatch = useDispatch();
    return (
        <div className='admin__category'>
            <Form>
                <Form.Item><Title level={2}>Добавление новой категории</Title></Form.Item>
                <Row>
                    <Col span={12}>
                        <Button type='primary' onClick={() => dispatch(OpenModalAction("CreateCategory"))}>Создать категорию</Button>
                    </Col>
                    <Col span={12}>
                        <List
                            header={<div>Существующие категории</div>}
                            bordered
                            dataSource={categories}
                            renderItem={(category: TCategory) => <List.Item actions={[<DeleteOutlined onClick={() => dispatch(DeleteCategoryAction(category.id))} />]}>{category.title}</List.Item>}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default AdminCategory;