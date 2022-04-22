import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, Row, Select, Upload } from 'antd';
import { Formik } from 'formik';
import './admin_coordinators.less';

const AdminCoordinators: React.FC = () => {
    return (
        <div className='admin__coordinators'>
            <Formik
                initialValues={{
                    ownerId: '',
                    producerIds: [],
                    coordinatorIds: []
                }}
                validateOnBlur
                onSubmit={async (values) => console.log(values)}>
                <Row>
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Подрядчик*">
                            <Select placeholder='Выберите подрядчика'>
                            </Select>
                        </Descriptions.Item>
                        <Descriptions.Item label="Продюсер*">
                            <Upload>
                                <Button type='link' icon={<PlusCircleOutlined />}>Добавить продюсера</Button>
                            </Upload>
                        </Descriptions.Item>
                        <Descriptions.Item label="Координатор*">
                            <Upload>
                                <Button type='link' icon={<PlusCircleOutlined />}>Добавить координатора</Button>
                            </Upload>
                        </Descriptions.Item>
                    </Descriptions>
                </Row>
            </Formik>
        </div >
    );
}

export default AdminCoordinators;


















