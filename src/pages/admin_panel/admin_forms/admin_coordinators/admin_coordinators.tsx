import React from 'react';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, List, Row } from 'antd';
import { Form, SubmitButton } from 'formik-antd';
import { nanoid } from 'nanoid';
import { FieldArray } from 'formik';
import './admin_coordinators.less';
import FormikSelect from '../components/select/select';

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
                        <Form.Item name='ownerId'>
                            <FormikSelect
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
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="Продюсер*">
                        <FieldArray name='producerIds'>
                            {({ push, remove }) => (
                                <List>
                                    {values.producerIds.map((_producer: any, index: number) => (
                                        <List.Item key={index} actions={[<DeleteOutlined onClick={() => remove(index)} />]}>
                                            <Form.Item name={`producerIds.${index}.name`}>
                                                <FormikSelect
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
                                            </Form.Item>
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
                        <FieldArray name='coordinatorIds'>
                            {({ push, remove }) => (
                                <List>
                                    {values.coordinatorIds.map((_coordinator: any, index: number) => (
                                        <List.Item key={index} actions={[<DeleteOutlined onClick={() => remove(index)} />]}>
                                            <Form.Item name={`coordinatorIds.${index}.name`}>
                                                <FormikSelect
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
                                            </Form.Item>
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
                <div className='submit__btn'>
                    <SubmitButton onSubmit={handleSubmit}>Создать</SubmitButton>
                </div>
            </Row>
        </div >
    );
}

export default AdminCoordinators;


















