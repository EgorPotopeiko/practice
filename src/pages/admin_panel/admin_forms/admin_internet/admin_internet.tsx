import React from 'react';
import { LinkOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, List, Row, Upload } from 'antd';
import './admin_internet.less';
import FormikControl from '../components/formik_control/formik_control';
import { FieldArray } from 'formik';
import { nanoid } from 'nanoid';

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
                            {({ push }) => (
                                <List>
                                    {values.channels.map((_channel: any, index: any) => (
                                        <List.Item key={index}>
                                            <FormikControl
                                                control='select'
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
                                            <FormikControl
                                                control='input'
                                                name={`channels.${index}.name`}
                                                type='number'
                                                placeholder='Введите название' />
                                            <FormikControl
                                                control='input'
                                                name={`channels.${index}.link`}
                                                type='number'
                                                placeholder='Введите ссылки' />
                                            <FormikControl
                                                control='input'
                                                name={`channels.${index}.planPublicationCount`}
                                                type='number'
                                                placeholder='Введите количество публикаций' />
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
                            {({ push }) => (
                                <List>
                                    {values.kpis.map((_kpi: any, index: any) => (
                                        <List.Item key={index}>
                                            <FormikControl
                                                control='input'
                                                name={`kpis.${index}.planCount`}
                                                type='number'
                                                placeholder='Введите показатель просмотров' />
                                            <FormikControl
                                                control='select'
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


















