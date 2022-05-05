import React, { useState, FC } from 'react';
import { Checkbox, Col, Descriptions, Row, Typography, Upload } from 'antd';
import './admin_projects.less';
import FormikInput from '../components/input/input';
import FormikDatePicker from '../components/datepicker/datepicker';
import FormikSelect from '../components/select/select';
import FormikTextArea from '../components/textarea/textarea';
import { Form } from 'formik-antd';
import { LinkOutlined } from '@ant-design/icons';

type Props = {
    formik: any
}

const optionsConc = [
    {
        key: 'Конкурс 1',
        value: '3290813874031'
    },
    {
        key: 'Конкурс 2',
        value: '19013894874893189'
    },
    {
        key: 'Конкурс 3',
        value: '13903905-0139854'
    }
]

const optionsYear = [
    {
        key: '2018',
        value: '129133187589031910'
    },
    {
        key: '2019',
        value: '219045901-4'
    },
    {
        key: '2020',
        value: '1903905031-94'
    }
]

const optionsSessionId = [
    {
        key: 'A1',
        value: '4930-4750930'
    },
    {
        key: 'B1',
        value: '359494384'
    },
    {
        key: 'C1',
        value: '34309309409505'
    }
]

const optionsStatusId = [
    {
        key: 'Выполнено',
        value: '12345'
    },
    {
        key: 'В процессе реализации',
        value: '164231'
    },
    {
        key: 'Отклонено',
        value: '8492194'
    }
]

const { Text } = Typography;

const props = { headers: { "Access-Control-Allow-Origin": 'http://localhost:3000' } };

const AdminProjects: FC<Props> = ({ formik }) => {
    const [fileList, setFileList] = useState([]);
    const { values, handleChange, setFieldValue } = formik;
    const onChange = ({ fileList: newFileList }: { fileList: any }) => {
        setFileList(newFileList);
        setFieldValue('fileIds', newFileList)
    };
    const onPreview = async (file: any) => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src)!;
        imgWindow.document.write(image.outerHTML);
    };
    return (
        <div className='admin__projects'>
            <Row>
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Название проекта*">
                        <Form.Item name='name'>
                            <FormikInput
                                name='name'
                                placeholder='Введите название проекта'
                                required={true} />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="Номер заявки*">
                        <div className='request'>
                            <Col flex={2}>
                                <Form.Item name='requestNumber'>
                                    <FormikInput
                                        name='requestNumber'
                                        placeholder='Введите номер заявки'
                                        required={true} />
                                </Form.Item>
                            </Col>
                            <Col flex={1} style={{ display: 'contents' }}>
                                <Text>Бюджет*</Text>
                                <Form.Item name='budget'>
                                    <FormikInput
                                        type='number'
                                        name='budget'
                                        placeholder='Введите бюджет проекта'
                                        required={true} />
                                </Form.Item>
                            </Col>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Договор*">
                        <div className='contract'>
                            <Col flex={1}>
                                <Form.Item name='contractNumber'>
                                    <FormikInput
                                        name='contractNumber'
                                        placeholder='Введите номер договора'
                                        required={true} />
                                </Form.Item>
                            </Col>
                            <Col flex={1} style={{ display: 'contents' }}>
                                <Text>От*</Text>
                                <Form.Item name='contractDate'>
                                    <FormikDatePicker
                                        name='contractDate'
                                        format='YYYY-MM-DD'
                                        placeholder='Выберите дату' />
                                </Form.Item>
                            </Col>
                            <Col flex={1} style={{ display: 'contents' }}>
                                <Text>Авансирование</Text>
                                <Form.Item name='advancePayment'>
                                    <Checkbox name='advancePayment' onChange={handleChange} />
                                </Form.Item>
                                <Form.Item name='igk'>
                                    <FormikInput
                                        disabled={!values.advancePayment}
                                        name='igk'
                                        placeholder='Введите №ИГК' />
                                </Form.Item>
                            </Col>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Конкурс*">
                        <div className='contest'>
                            <Col flex={2}>
                                <Form.Item name='conc'>
                                    <FormikSelect
                                        name='conc'
                                        placeholder='Выберите конкурс'
                                        options={optionsConc} />
                                </Form.Item>
                            </Col>
                            <Col flex={1} style={{ display: 'contents' }}>
                                <Text>Год*</Text>
                                <Form.Item name='year'>
                                    <FormikSelect
                                        name='year'
                                        placeholder='Выберите год'
                                        options={optionsYear} />
                                </Form.Item>
                            </Col>
                            <Col flex={2} style={{ display: 'contents' }}>
                                <Text>Сессия*</Text>
                                <Form.Item name='sessionId'>
                                    <FormikSelect
                                        name='sessionId'
                                        placeholder='Выберите сессию'
                                        options={optionsSessionId} />
                                </Form.Item>
                            </Col>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Цель проекта">
                        <Form.Item name='goal'>
                            <FormikTextArea
                                name='goal'
                                placeholder='Введите цель проекта' />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="Описание проекта">
                        <Form.Item name='description'>
                            <FormikTextArea
                                name='description'
                                placeholder='Введите описание проекта' />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="Статус">
                        <div className='draft'>
                            <Col flex={4}>
                                <Form.Item name='statusId'>
                                    <FormikSelect
                                        name='statusId'
                                        placeholder='Черновик'
                                        options={optionsStatusId} />
                                </Form.Item>
                            </Col>
                            <Col flex={2} style={{ display: 'flex', justifyContent: 'end' }}>
                                <Text>Дата завершения проекта</Text>
                                <Form.Item name='completionDate'>
                                    <FormikDatePicker
                                        name='completionDate'
                                        format='YYYY-MM-DD'
                                        placeholder='Выберите дату' />
                                </Form.Item>
                            </Col>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Дополнительные материалы">
                        <Form.Item name='fileIds'>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                accept='.pdf'
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                                disabled={fileList.length > 0}
                                {...props}
                            >
                                {fileList.length < 5 && <><LinkOutlined />Добавить файл .pdf</>}
                            </Upload>
                        </Form.Item>
                    </Descriptions.Item>
                </Descriptions>
            </Row>
        </div >
    );
}

export default AdminProjects;


















