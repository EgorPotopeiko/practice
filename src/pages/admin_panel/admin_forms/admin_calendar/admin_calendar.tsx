import React from 'react';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, List, Row } from 'antd';
import { nanoid } from 'nanoid';
import { FieldArray } from 'formik';
import './admin_calendar.less';
import FormikSelect from '../components/select/select';
import FormikRadioGroup from '../components/radiogroup/radiogroup';
import FormikInput from '../components/input/input';
import { Form } from 'formik-antd';

type Props = {
    formik: any
}

const AdminCalendar: React.FC<Props> = ({ formik }) => {
    const { values } = formik;
    return (
        <div className='admin__calendar'>
            <Row>
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Тематика контента*">
                        <Form.Item name='contentThematicIds'>
                            <FormikSelect
                                name='contentThematicIds'
                                placeholder='Выберите тематику контента'
                                mode='multiple'
                                required={true}
                                options={[
                                    {
                                        key: 'Content 1',
                                        value: '5903109100941'
                                    },
                                    {
                                        key: 'Content 2',
                                        value: '0-148949053'
                                    },
                                    {
                                        key: 'Content 3',
                                        value: '14069-4184'
                                    }
                                ]} />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="Направление контента*">
                        <Form.Item name='contentDirectionId'>
                            <FormikRadioGroup
                                name='contentDirectionId'
                                placeholder='Выберите направление контента'
                                required={true}
                                radioData={[
                                    {
                                        id: 1,
                                        value: 'Мультиформат'
                                    },
                                    {
                                        id: 2,
                                        value: 'Видеоконтент'
                                    },
                                    {
                                        id: 3,
                                        value: 'Контент в блогосфере'
                                    },
                                    {
                                        id: 4,
                                        value: 'Программные продукты'
                                    }
                                ]} />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="Формат контента*">
                        <FieldArray name='contentFormats'>
                            {({ push, remove }) => (
                                <List>
                                    {values.contentFormats.map((_contentFormat: any, index: number) => (
                                        <List.Item key={index} actions={[<DeleteOutlined onClick={() => remove(index)} />]}>
                                            <Form.Item name={`contentFormats.${index}.typeId`}>
                                                <FormikSelect
                                                    name={`contentFormats.${index}.typeId`}
                                                    placeholder='Info'
                                                    options={[
                                                        {
                                                            key: 'Info 1',
                                                            value: '1890598039014'
                                                        },
                                                        {
                                                            key: 'Info 2',
                                                            value: '1094-3-315531'
                                                        },
                                                        {
                                                            key: 'Info 3',
                                                            value: '319509314'
                                                        }
                                                    ]} />
                                            </Form.Item>
                                            <Form.Item name={`contentFormats.${index}.contentCount`}>
                                                <FormikInput
                                                    name={`contentFormats.${index}.contentCount`}
                                                    type='number'
                                                    placeholder='Введите количество' />
                                            </Form.Item>
                                            <Form.Item name={`contentFormats.${index}.submissionFormId`}>
                                                <FormikSelect
                                                    name={`contentFormats.${index}.submissionFormId`}
                                                    placeholder='Type'
                                                    options={[
                                                        {
                                                            key: 'Type 1',
                                                            value: '503919849_3819'
                                                        },
                                                        {
                                                            key: 'Type 2',
                                                            value: '146885252'
                                                        },
                                                        {
                                                            key: 'Type 3',
                                                            value: '242689'
                                                        }
                                                    ]} />
                                            </Form.Item>
                                        </List.Item>
                                    ))}
                                    <Button
                                        onClick={() => push({ id: nanoid(), typeId: '', contentCount: 0, submissionFormId: '' })}
                                        type='link'
                                        icon={<PlusCircleOutlined />}>Добавить тип контента</Button>
                                </List>
                            )}
                        </FieldArray>
                    </Descriptions.Item>
                </Descriptions>
            </Row>
        </div >
    );
}

export default AdminCalendar;


















