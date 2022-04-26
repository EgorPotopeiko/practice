import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Descriptions, Input, Row, Select, Typography, Upload } from 'antd';
import './admin_projects.less';
import TextArea from 'antd/lib/input/TextArea';

type Props = {
    formik: any
}

const { Text } = Typography;

const AdminProjects: React.FC<Props> = ({ formik }) => {
    const { values, setFieldValue, handleChange, getFieldProps } = formik;
    return (
        <div className='admin__projects'>
            <Row>
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Название проекта*">
                        <Input
                            required={true}
                            placeholder='Введите название проекта'
                            name='name'
                            {...getFieldProps('name')}>
                        </Input>
                    </Descriptions.Item>
                    <Descriptions.Item label="Номер заявки*">
                        <div className='request'>
                            <Col flex={2}>
                                <Input
                                    required={true}
                                    placeholder='Введите номер заявки'
                                    name='requestNumber'
                                    {...getFieldProps('requestNumber')}>

                                </Input>
                            </Col>
                            <Col flex={1} style={{ display: 'flex' }}>
                                <Text>Бюджет*</Text>
                                <Input
                                    required={true}
                                    type='number'
                                    placeholder='Введите бюджет проекта'
                                    name='budget'
                                    {...getFieldProps('budget')}>
                                </Input>
                            </Col>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Договор*">
                        <div className='contract'>
                            <Col flex={1}>
                                <Input
                                    required={true}
                                    type='number'
                                    placeholder='Введите номер договора'
                                    name='contractNumber'
                                    {...getFieldProps('contractNumber')}>
                                </Input>
                            </Col>
                            <Col flex={1}>
                                <Text>От*</Text>
                                <DatePicker placeholder='Выберите дату' format='YYYY-MM-DD' name='contractDate' />
                            </Col>
                            <Col flex={1} style={{ display: 'flex' }}>
                                <Text>Авансирование</Text>
                                <Checkbox name='advancePayment' onChange={handleChange} />
                                <Input
                                    disabled={!values.advancePayment}
                                    placeholder='Введите № ИГК'
                                    name='advancePayment'
                                    {...getFieldProps('advancePayment')}>
                                </Input>
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
                                <Select
                                    value={values.sessionId}
                                    placeholder='Выберите сессию'
                                    onChange={(e: any) => setFieldValue('sessionId', e.target.value)} />
                            </Col>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Цель проекта">
                        <TextArea
                            placeholder='Введите цель проекта'
                            name='goal'
                            {...getFieldProps('goal')}>
                        </TextArea>
                    </Descriptions.Item>
                    <Descriptions.Item label="Описание проекта">
                        <TextArea
                            placeholder='Введите описание проекта'
                            name='description'
                            {...getFieldProps('description')}>
                        </TextArea>
                    </Descriptions.Item>
                    <Descriptions.Item label="Статус">
                        <div className='draft'>
                            <Col flex={4}>
                                <Select value={values.statusId} placeholder='Черновик' onChange={(e: any) => setFieldValue('statusId', e.target.value)}></Select>
                            </Col>
                            <Col flex={2} style={{ display: 'flex', justifyContent: 'end' }}>
                                <Text>Дата завершения проекта</Text>
                                <DatePicker placeholder='Выберите дату' format='YYYY-MM-DD' name='completionDate' />
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
        </div >
    );
}

export default AdminProjects;


















