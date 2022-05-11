import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, List, Row, Typography } from 'antd';
import { OpenModalAction } from '../../../store/modals/actions';
import { selectErrorCategories, selectListCategories } from '../../../store/category/selectors';
import { DeleteCategoryAction } from '../../../store/category/actions';
import { TCategory } from '../../../models/category';
import './admin_category.less';
import ErrorIndicator from '../../../components/error_indicator/error_indicator';

const { Title } = Typography;

const AdminCategory: FC = () => {
    const categories = useSelector(selectListCategories);
    const error = useSelector(selectErrorCategories);
    const dispatch = useDispatch();
    return (
        <div className='admin__category'>
            {error && <ErrorIndicator />}
            {!error &&
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
            }
        </div>
    );
}

export default AdminCategory;