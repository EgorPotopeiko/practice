import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, List, Row, Typography } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './admin_category.less'
import { deletedCategory } from "../../../store/filters/actions";
import { OpenModalAction } from '../../../store/modals/actions';
import { selectUserMenu } from '../../../store/filters/selectors';

const { Title } = Typography;

const AdminCategory: React.FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectUserMenu);
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
                            renderItem={(item: string) => <List.Item actions={[<DeleteOutlined onClick={() => dispatch(deletedCategory(item))} />]}>{item}</List.Item>}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default AdminCategory;