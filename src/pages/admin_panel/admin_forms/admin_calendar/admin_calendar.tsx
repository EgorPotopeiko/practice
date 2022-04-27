import React from 'react';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, List, Row } from 'antd';
import { nanoid } from 'nanoid';
import { FieldArray } from 'formik';
import './admin_calendar.less';
import FormikSelect from '../components/select/select';
import FormikRadioGroup from '../components/radiogroup/radiogroup';
import FormikInput from '../components/input/input';

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
                    </Descriptions.Item>
                    <Descriptions.Item label="Направление контента*">
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
                    </Descriptions.Item>
                    <Descriptions.Item label="Формат контента*">
                        <FieldArray name='contentFormats'>
                            {({ push, remove }) => (
                                <List>
                                    {values.contentFormats.map((_contentFormat: any, index: number) => (
                                        <List.Item key={index} actions={[<DeleteOutlined onClick={() => remove(index)} />]}>
                                            <FormikSelect
                                                name={`contentFormats.${index}.info`}
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
                                            <FormikInput
                                                name={`contentFormats.${index}.num`}
                                                type='number'
                                                placeholder='Введите количество' />
                                            <FormikSelect
                                                name={`contentFormats.${index}.type`}
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


















