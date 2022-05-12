import React, { FC } from 'react';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, List, Row } from 'antd';
import { nanoid } from 'nanoid';
import { FieldArray } from 'formik';
import FormikSelect from '../components/select/select';
import FormikRadioGroup from '../components/radiogroup/radiogroup';
import FormikInput from '../components/input/input';
import { ContentFormat } from '../models';
import './admin_calendar.less';

type Props = {
    formik: any
}

const optionsThematics = [
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
]

const dataDirection = [
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
]

const optionsFormatsTypeId = [
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
]

const optionsFormatsSubmissionFormId = [
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
]

const AdminCalendar: FC<Props> = ({ formik }) => {
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
                            options={optionsThematics} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Направление контента*">
                        <FormikRadioGroup
                            name='contentDirectionId'
                            placeholder='Выберите направление контента'
                            required={true}
                            radioData={dataDirection} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Формат контента*">
                        <FieldArray name='contentFormats'>
                            {({ push, remove }) => (
                                <List>
                                    {values.contentFormats.map((_contentFormat: ContentFormat, index: number) => (
                                        <List.Item key={index} actions={[<DeleteOutlined onClick={() => remove(index)} />]}>
                                            <FormikSelect
                                                name={`contentFormats.${index}.typeId`}
                                                placeholder='Info'
                                                options={optionsFormatsTypeId} />
                                            <FormikInput
                                                name={`contentFormats.${index}.contentCount`}
                                                type='number'
                                                placeholder='Введите количество' />
                                            <FormikSelect
                                                name={`contentFormats.${index}.submissionFormId`}
                                                placeholder='Type'
                                                options={optionsFormatsSubmissionFormId} />
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


















