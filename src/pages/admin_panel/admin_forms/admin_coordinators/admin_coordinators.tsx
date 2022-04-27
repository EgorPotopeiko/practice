import React from 'react';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, List, Row } from 'antd';
import { SubmitButton } from 'formik-antd';
import FormikControl from '../components/formik_control/formik_control';
import { nanoid } from 'nanoid';
import { FieldArray } from 'formik';
import './admin_coordinators.less';

type Props = {
    formik: any
}

const AdminCoordinators: React.FC<Props> = ({ formik }) => {
    const { values, handleSubmit } = formik;
    return (
        <div className='admin__coordinators'>
            <Row>
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Подрядчик*">
                        <FormikControl
                            control='select'
                            name='ownerId'
                            placeholder='Выберите подрядчика'
                            required={true}
                            options={[
                                {
                                    id: nanoid(),
                                    value: 'Подрядчик 1'
                                },
                                {
                                    id: nanoid(),
                                    value: 'Подрядчик 2'
                                },
                                {
                                    id: nanoid(),
                                    value: 'Подрядчик 3'
                                }
                            ]} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Продюсер*">
                        <FieldArray name='producerIds'>
                            {({ push, remove }) => (
                                <List>
                                    {values.producerIds.map((_producer: any, index: any) => (
                                        <List.Item key={index} actions={[<DeleteOutlined onClick={() => remove(index)} />]}>
                                            <FormikControl
                                                control='select'
                                                name={`producerIds.${index}.name`}
                                                placeholder='Выберите продюсера'
                                                options={[
                                                    {
                                                        id: nanoid(),
                                                        value: 'Продюсер 1'
                                                    },
                                                    {
                                                        id: nanoid(),
                                                        value: 'Продюсер 2'
                                                    },
                                                    {
                                                        id: nanoid(),
                                                        value: 'Продюсер 3'
                                                    }
                                                ]} />
                                        </List.Item>
                                    ))}
                                    <Button
                                        onClick={() => push({ id: nanoid(), name: '' })}
                                        type='link'
                                        icon={<PlusCircleOutlined />}>Добавить продюсера</Button>
                                </List>
                            )}
                        </FieldArray>
                    </Descriptions.Item>
                    <Descriptions.Item label="Координатор*">
                        <FieldArray name='producerIds'>
                            {({ push, remove }) => (
                                <List>
                                    {values.coordinatorIds.map((_coordinator: any, index: any) => (
                                        <List.Item key={index} actions={[<DeleteOutlined onClick={() => remove(index)} />]}>
                                            <FormikControl
                                                control='select'
                                                name={`coordinatorIds.${index}.name`}
                                                placeholder='Выберите координатора'
                                                options={[
                                                    {
                                                        id: nanoid(),
                                                        value: 'Координатор 1'
                                                    },
                                                    {
                                                        id: nanoid(),
                                                        value: 'Координатор 2'
                                                    },
                                                    {
                                                        id: nanoid(),
                                                        value: 'Координатор 3'
                                                    }
                                                ]} />
                                        </List.Item>
                                    ))}
                                    <Button
                                        onClick={() => push({ id: nanoid(), name: '' })}
                                        type='link'
                                        icon={<PlusCircleOutlined />}>Добавить координатора</Button>
                                </List>
                            )}
                        </FieldArray>
                    </Descriptions.Item>
                </Descriptions>
                <SubmitButton onSubmit={handleSubmit}>Создать</SubmitButton>
            </Row>
        </div >
    );
}

export default AdminCoordinators;


















