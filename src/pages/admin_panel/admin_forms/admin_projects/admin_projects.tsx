import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Descriptions, Row, Typography, Upload } from 'antd';
import './admin_projects.less';
import { nanoid } from 'nanoid';
import FormikInput from '../components/input/input';
import FormikDatePicker from '../components/datepicker/datepicker';
import FormikSelect from '../components/select/select';
import FormikTextArea from '../components/textarea/textarea';

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
                        <FormikInput
                            name='name'
                            placeholder='Введите название проекта'
                            required={true} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Номер заявки*">
                        <div className='request'>
                            <Col flex={2}>
                                <FormikInput
                                    name='requestNumber'
                                    placeholder='Введите номер заявки'
                                    required={true} />
                            </Col>
                            <Col flex={1} style={{ display: 'contents' }}>
                                <Text>Бюджет*</Text>
                                <FormikInput
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
                                <FormikInput
                                    type='number'
                                    name='contractNumber'
                                    placeholder='Введите номер договора'
                                    required={true} />
                            </Col>
                            <Col flex={1} style={{ display: 'contents' }}>
                                <Text>От*</Text>
                                <FormikDatePicker
                                    name='contractDate'
                                    format='YYYY-MM-DD'
                                    placeholder='Выберите дату' />
                            </Col>
                            <Col flex={1} style={{ display: 'contents' }}>
                                <Text>Авансирование</Text>
                                <Checkbox name='advancePayment' onChange={handleChange} />
                                <FormikInput
                                    disabled={!values.advancePayment}
                                    name='igk'
                                    placeholder='Введите №ИГК' />
                            </Col>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Конкурс*">
                        <div className='contest'>
                            <Col flex={2}>
                                <FormikSelect
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
                                <FormikSelect
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
                                <FormikSelect
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
                        <FormikTextArea
                            name='goal'
                            placeholder='Введите цель проекта' />
                    </Descriptions.Item>
                    <Descriptions.Item label="Описание проекта">
                        <FormikTextArea
                            name='description'
                            placeholder='Введите описание проекта' />
                    </Descriptions.Item>
                    <Descriptions.Item label="Статус">
                        <div className='draft'>
                            <Col flex={4}>
                                <FormikSelect
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
                                <FormikDatePicker
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


















