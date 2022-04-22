import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Descriptions, Input, Row, Select, Typography, Upload } from 'antd';
import { Formik } from 'formik';
import './admin_projects.less';
import TextArea from 'antd/lib/input/TextArea';

const { Text } = Typography;

const AdminProjects: React.FC = () => {
    return (
        <div className='admin__projects'>
            <Formik
                initialValues={{
                    name: '',
                    requestNumber: '',
                    contractNumber: '',
                    contractDate: '',
                    advancePayment: false,
                    igk: '',
                    budget: 0,
                    sessionId: '',
                    goal: '',
                    description: '',
                    completionDate: '',
                    statusId: '',
                }}
                validateOnBlur
                onSubmit={async (values) => console.log(values)}>
                <Row>
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Название проекта*"><Input placeholder='Введите название проекта'></Input></Descriptions.Item>
                        <Descriptions.Item label="Номер заявки*">
                            <div className='request'>
                                <Col flex={2}>
                                    <Input placeholder='Введите номер заявки'></Input>
                                </Col>
                                <Col flex={1} style={{ display: 'flex' }}>
                                    <Text>Бюджет*</Text>
                                    <Input type='number' placeholder='Введите бюджет проекта'></Input>
                                </Col>
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Договор*">
                            <div className='contract'>
                                <Col flex={1}>
                                    <Input type='number' placeholder='Введите номер договора'></Input>
                                </Col>
                                <Col flex={1}>
                                    <Text>От*</Text>
                                    <DatePicker placeholder='Выберите дату' />
                                </Col>
                                <Col flex={1} style={{ display: 'flex' }}>
                                    <Text>Авансирование</Text>
                                    <Checkbox />
                                    <Input placeholder='Введите № ИГК'></Input>
                                </Col>
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Конкурс*">
                            <div className='contest'>
                                <Col flex={2}>
                                    <Select placeholder='Выберите конкурс'></Select>
                                </Col>
                                <Col flex={1} style={{ display: 'flex' }}>
                                    <Text>Год*</Text>
                                    <Select placeholder='Выберите год' />
                                </Col>
                                <Col flex={2} style={{ display: 'flex' }}>
                                    <Text>Сессия*</Text>
                                    <Select placeholder='Выберите сессию' />
                                </Col>
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Цель проекта">
                            <TextArea placeholder='Введите цель проекта'></TextArea>
                        </Descriptions.Item>
                        <Descriptions.Item label="Описание проекта">
                            <TextArea placeholder='Введите описание проекта'></TextArea>
                        </Descriptions.Item>
                        <Descriptions.Item label="Статус">
                            <div className='draft'>
                                <Col flex={4}>
                                    <Select placeholder='Черновик'></Select>
                                </Col>
                                <Col flex={2} style={{ display: 'flex', justifyContent: 'end' }}>
                                    <Text>Дата завершения проекта</Text>
                                    <DatePicker placeholder='Выберите дату' />
                                </Col>
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Дополнительные материалы">
                            <Upload>
                                <Button type='link' icon={<UploadOutlined />}>Добавить файл .pdf</Button>
                            </Upload>
                        </Descriptions.Item>
                    </Descriptions>
                </Row>
            </Formik>
        </div >
    );
}

export default AdminProjects;


















