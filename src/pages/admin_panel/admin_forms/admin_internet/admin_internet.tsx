import React from 'react';
import { DeleteOutlined, LinkOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, List, Row, Upload } from 'antd';
import { FieldArray } from 'formik';
import { nanoid } from 'nanoid';
import './admin_internet.less';
import FormikSelect from '../components/select/select';
import FormikInput from '../components/input/input';
import { Form } from 'formik-antd';

type Props = {
    formik: any
}

const AdminInternet: React.FC<Props> = ({ formik }) => {
    const { values } = formik;
    return (
        <div className='admin__internet'>
            <Row>
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Добавить интернет-ресурс">
                        <FieldArray name='channels'>
                            {({ push, remove }) => (
                                <List>
                                    {values.channels.map((_channel: any, index: number) => (
                                        <List.Item key={index} actions={[<DeleteOutlined onClick={() => remove(index)} />]}>
                                            <Form.Item name={`channels.${index}.internetResourceId`}>
                                                <FormikSelect
                                                    name={`channels.${index}.internetResourceId`}
                                                    placeholder='Выберите интернет-ресурс'
                                                    required={true}
                                                    options={[
                                                        {
                                                            id: nanoid(),
                                                            value: 'Instagram'
                                                        },
                                                        {
                                                            id: nanoid(),
                                                            value: 'Facebook'
                                                        },
                                                        {
                                                            id: nanoid(),
                                                            value: 'Twitter'
                                                        }
                                                    ]} />
                                            </Form.Item>
                                            <Form.Item name={`channels.${index}.name`}>
                                                <FormikInput
                                                    name={`channels.${index}.name`}
                                                    type='number'
                                                    placeholder='Введите название' />
                                            </Form.Item>
                                            <Form.Item name={`channels.${index}.link`}>
                                                <FormikInput
                                                    name={`channels.${index}.link`}
                                                    type='number'
                                                    placeholder='Введите ссылки' />
                                            </Form.Item>
                                            <Form.Item name={`channels.${index}.planPublicationCount`}>
                                                <FormikInput
                                                    name={`channels.${index}.planPublicationCount`}
                                                    type='number'
                                                    placeholder='Введите количество публикаций' />
                                            </Form.Item>
                                        </List.Item>
                                    ))}
                                    <Button
                                        onClick={() => push({
                                            id: nanoid(),
                                            name: '',
                                            link: '',
                                            planPublicationCount: 0,
                                            internetResourceId: ''
                                        })}
                                        type='link'
                                        icon={<PlusCircleOutlined />}>Добавить интернет-ресурс</Button>
                                </List>
                            )}
                        </FieldArray>
                    </Descriptions.Item>
                    <Descriptions.Item label="Плановый КПЭ*">
                        <FieldArray name='kpis'>
                            {({ push, remove }) => (
                                <List>
                                    {values.kpis.map((_kpi: any, index: number) => (
                                        <List.Item key={index} actions={[<DeleteOutlined onClick={() => remove(index)} />]}>
                                            <Form.Item name={`kpis.${index}.planCount`}>
                                                <FormikInput
                                                    name={`kpis.${index}.planCount`}
                                                    type='number'
                                                    placeholder='Введите показатель просмотров' />
                                            </Form.Item>
                                            <Form.Item name={`kpis.${index}.typeId`}>
                                                <FormikSelect
                                                    name={`kpis.${index}.typeId`}
                                                    placeholder='Выберите меру измерения КПЭ'
                                                    required={true}
                                                    options={[
                                                        {
                                                            id: nanoid(),
                                                            value: 'Просмотров'
                                                        },
                                                        {
                                                            id: nanoid(),
                                                            value: 'Прослушиваний'
                                                        },
                                                        {
                                                            id: nanoid(),
                                                            value: 'Скачиваний'
                                                        }
                                                    ]} />
                                            </Form.Item>
                                        </List.Item>
                                    ))}
                                    <Button
                                        onClick={() => push({ id: nanoid(), planCount: 0, typeId: '' })}
                                        type='link'
                                        icon={<PlusCircleOutlined />}>Добавить плановый КПЭ</Button>
                                </List>
                            )}
                        </FieldArray>
                    </Descriptions.Item>
                    <Descriptions.Item label="Изображение проекта">
                        <Upload>
                            <Button type='link' icon={<LinkOutlined />}>Добавить изображение</Button>
                        </Upload>
                    </Descriptions.Item>
                </Descriptions>
            </Row>
        </div >
    );
}

export default AdminInternet;


















