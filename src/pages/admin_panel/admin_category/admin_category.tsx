import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, List, Row, Typography } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './admin_category.less';
import { OpenModalAction } from '../../../store/modals/actions';
import { selectListCategories } from '../../../store/category/selectors';
import { DeleteCategoryAction } from '../../../store/category/actions';
import { TCategory } from '../../../models/category';

const { Title } = Typography;

const AdminCategory: React.FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectListCategories);
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
                            renderItem={(item: TCategory) => <List.Item actions={[<DeleteOutlined onClick={() => dispatch(DeleteCategoryAction(item.id))} />]}>{item.title}</List.Item>}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default AdminCategory;