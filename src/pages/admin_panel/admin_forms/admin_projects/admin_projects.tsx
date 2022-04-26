import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Descriptions, Row, Typography, Upload } from 'antd';
import './admin_projects.less';
import FormikControl from '../components/formik_control/formik_control';
import { nanoid } from 'nanoid';

type Props = {
    formik: any
}

const { Text } = Typography;

const AdminProjects: React.FC<Props> = ({ formik }) => {
    const { values, handleChange } = formik;
    return (
        <div className='admin__projects'>
            <Row>
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Название проекта*">
                        <FormikControl
                            control='input'
                            name='name'
                            placeholder='Введите название проекта'
                            required={true} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Номер заявки*">
                        <div className='request'>
                            <Col flex={2}>
                                <FormikControl
                                    control='input'
                                    name='requestNumber'
                                    placeholder='Введите номер заявки'
                                    required={true} />
                            </Col>
                            <Col flex={1} style={{ display: 'contents' }}>
                                <Text>Бюджет*</Text>
                                <FormikControl
                                    control='input'
                                    type='number'
                                    name='budget'
                                    placeholder='Введите бюджет проекта'
                                    required={true} />
                            </Col>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Договор*">
                        <div className='contract'>
                            <Col flex={1}>
                                <FormikControl
                                    control='input'
                                    type='number'
                                    name='contractNumber'
                                    placeholder='Введите номер договора'
                                    required={true} />
                            </Col>
                            <Col flex={1} style={{ display: 'contents' }}>
                                <Text>От*</Text>
                                <FormikControl
                                    control='date'
                                    name='contractDate'
                                    format='YYYY-MM-DD'
                                    placeholder='Выберите дату' />
                            </Col>
                            <Col flex={1} style={{ display: 'contents' }}>
                                <Text>Авансирование</Text>
                                <Checkbox name='advancePayment' onChange={handleChange} />
                                <FormikControl
                                    control='input'
                                    disabled={!values.advancePayment}
                                    name='igk'
                                    placeholder='Введите №ИГК' />
                            </Col>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Конкурс*">
                        <div className='contest'>
                            <Col flex={2}>
                                <FormikControl
                                    control='select'
                                    name='conc'
                                    placeholder='Выберите конкурс'
                                    options={[
                                        {
                                            id: nanoid(),
                                            value: 'Конкурс 1'
                                        },
                                        {
                                            id: nanoid(),
                                            value: 'Конкурс 2'
                                        },
                                        {
                                            id: nanoid(),
                                            value: 'Конкурс 3'
                                        }
                                    ]} />
                            </Col>
                            <Col flex={1} style={{ display: 'contents' }}>
                                <Text>Год*</Text>
                                <FormikControl
                                    control='select'
                                    name='year'
                                    placeholder='Выберите год'
                                    options={[
                                        {
                                            id: nanoid(),
                                            value: '2018'
                                        },
                                        {
                                            id: nanoid(),
                                            value: '2019'
                                        },
                                        {
                                            id: nanoid(),
                                            value: '2020'
                                        }
                                    ]} />
                            </Col>
                            <Col flex={2} style={{ display: 'contents' }}>
                                <Text>Сессия*</Text>
                                <FormikControl
                                    control='select'
                                    name='sessionId'
                                    placeholder='Выберите сессию'
                                    options={[
                                        {
                                            id: nanoid(),
                                            value: 'A1'
                                        },
                                        {
                                            id: nanoid(),
                                            value: 'B1'
                                        },
                                        {
                                            id: nanoid(),
                                            value: 'C1'
                                        }
                                    ]} />
                            </Col>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Цель проекта">
                        <FormikControl
                            control='textarea'
                            name='goal'
                            placeholder='Введите цель проекта' />
                    </Descriptions.Item>
                    <Descriptions.Item label="Описание проекта">
                        <FormikControl
                            control='textarea'
                            name='description'
                            placeholder='Введите описание проекта' />
                    </Descriptions.Item>
                    <Descriptions.Item label="Статус">
                        <div className='draft'>
                            <Col flex={4}>
                                <FormikControl
                                    control='select'
                                    name='statusId'
                                    placeholder='Черновик'
                                    options={[
                                        {
                                            id: nanoid(),
                                            value: 'Выполнено'
                                        },
                                        {
                                            id: nanoid(),
                                            value: 'В процессе реализации'
                                        },
                                        {
                                            id: nanoid(),
                                            value: 'Отклонено'
                                        }
                                    ]} />
                            </Col>
                            <Col flex={2} style={{ display: 'flex', justifyContent: 'end' }}>
                                <Text>Дата завершения проекта</Text>
                                <FormikControl
                                    control='date'
                                    name='completionDate'
                                    format='YYYY-MM-DD'
                                    placeholder='Выберите дату' />
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


















