import React, { FC } from 'react';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, List, Row } from 'antd';
import { SubmitButton } from 'formik-antd';
import { nanoid } from 'nanoid';
import { FieldArray } from 'formik';
import './admin_coordinators.less';
import FormikSelect from '../components/select/select';
import { Coordinator, Producer } from '../models';

type Props = {
    formik: any
}

const optionsOwnerId = [
    {
        key: 'Подрядчик 1',
        value: '8130909859015'
    },
    {
        key: 'Подрядчик 2',
        value: '31-013-490141'
    },
    {
        key: 'Подрядчик 3',
        value: '31-901894480592'
    }
]

const optionsProducerIdsName = [
    {
        key: 'Продюсер 1',
        value: '42908412412'
    },
    {
        key: 'Продюсер 2',
        value: '24109495'
    },
    {
        key: 'Продюсер 3',
        value: '31940091'
    }
]

const optionsCoordinatorIdsName = [
    {
        key: 'Координатор 1',
        value: '13095931'
    },
    {
        key: 'Координатор 2',
        value: '1331_31090931'
    },
    {
        key: 'Координатор 3',
        value: '1400-4-14141'
    }
]

const AdminCoordinators: FC<Props> = ({ formik }) => {
    const { values, handleSubmit } = formik;
    return (
        <div className='admin__coordinators'>
            <Row>
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Подрядчик*">
                        <FormikSelect
                            name='ownerId'
                            placeholder='Выберите подрядчика'
                            required={true}
                            options={optionsOwnerId} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Продюсер*">
                        <FieldArray name='producerIds'>
                            {({ push, remove }) => (
                                <List>
                                    {values.producerIds.map((_producer: Producer, index: number) => (
                                        <List.Item key={index} actions={[<DeleteOutlined onClick={() => remove(index)} />]}>
                                            <FormikSelect
                                                name={`producerIds.${index}.name`}
                                                placeholder='Выберите продюсера'
                                                options={optionsProducerIdsName} />
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
                                    {values.coordinatorIds.map((_coordinator: Coordinator, index: number) => (
                                        <List.Item key={index} actions={[<DeleteOutlined onClick={() => remove(index)} />]}>
                                            <FormikSelect
                                                name={`coordinatorIds.${index}.name`}
                                                placeholder='Выберите координатора'
                                                options={optionsCoordinatorIdsName} />
                                        </List.Item>
                                    )
                                    )}
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


















