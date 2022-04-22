import React, { useState } from 'react';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, List, Row, Select } from 'antd';
import { Formik } from 'formik';
import './admin_coordinators.less';

const AdminCoordinators: React.FC = () => {
    const [producers, setProducers]: any = useState([]);
    const [coordinators, setCoordinators]: any = useState([]);
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
                            <Select placeholder='Выберите подрядчика'></Select>
                        </Descriptions.Item>
                        <Descriptions.Item label="Продюсер*">
                            <List style={{ display: producers.length === 0 ? 'none' : 'block' }}>
                                {producers.map((select: any) => (
                                    <List.Item key={select.id} actions={[<DeleteOutlined onClick={() => setProducers(producers.filter((producer: any) => producer.id !== select.id))} />]}><Select placeholder={select.title}></Select></List.Item>
                                ))}
                            </List>
                            <Button type='link' onClick={() => setProducers([...producers, { id: Math.random(), title: 'Добавить продюсера' }])} icon={<PlusCircleOutlined />}>Добавить продюсера</Button>
                        </Descriptions.Item>
                        <Descriptions.Item label="Координатор*">
                            <List style={{ display: coordinators.length === 0 ? 'none' : 'block' }}>
                                {coordinators.map((select: any) => (
                                    <List.Item key={select.id} actions={[<DeleteOutlined onClick={() => setCoordinators(coordinators.filter((coordinator: any) => coordinator.id !== select.id))} />]}><Select placeholder={select.title}></Select></List.Item>
                                ))}
                            </List>
                            <Button type='link' onClick={() => setCoordinators([...coordinators, { id: Math.random(), title: 'Добавить координатора' }])} icon={<PlusCircleOutlined />}>Добавить координатора</Button>
                        </Descriptions.Item>
                    </Descriptions>
                </Row>
            </Formik>
        </div >
    );
}

export default AdminCoordinators;


















