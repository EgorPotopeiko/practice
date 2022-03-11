import { Button, Col, Form, Input, List, Row, Typography } from 'antd';
import React from 'react';
import './adminCategory.less'

const { Title } = Typography;

const data = [
    'Racing car sprays.',
    'Japanese princess.',
    'Australian walks.',
    'Man charged.',
    'Los Angeles.',
];

const AdminCategory: React.FC = () => {
    return (
        <div className='adminCategory'>
            <Form>
                <Form.Item>
                    <Title level={3}>Добавление новой категории</Title>
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Input placeholder='Название новой категории' />
                        <Button type='primary'>Создать категорию</Button>
                    </Col>
                    <Col span={12}>
                        <List header={<div>Существующие категории</div>} bordered dataSource={data} renderItem={item => <List.Item>{item}</List.Item>} />
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default AdminCategory;