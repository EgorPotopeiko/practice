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
                                        id: nanoid(),
                                        value: 'Content 1'
                                    },
                                    {
                                        id: nanoid(),
                                        value: 'Content 2'
                                    },
                                    {
                                        id: nanoid(),
                                        value: 'Content 3'
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
                                                            id: nanoid(),
                                                            value: 'Info 1'
                                                        },
                                                        {
                                                            id: nanoid(),
                                                            value: 'Info 2'
                                                        },
                                                        {
                                                            id: nanoid(),
                                                            value: 'Info 3'
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
                                                            id: nanoid(),
                                                            value: 'Type 1'
                                                        },
                                                        {
                                                            id: nanoid(),
                                                            value: 'Type 2'
                                                        },
                                                        {
                                                            id: nanoid(),
                                                            value: 'Type 3'
                                                        }
                                                    ]} />
                                            </Form.Item>
                                        </List.Item>
                                    ))}
                                    <Button
                                        onClick={() => push({ id: nanoid(), info: '', num: 0, type: '' })}
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


















