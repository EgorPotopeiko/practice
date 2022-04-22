import React, { useState } from 'react';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, Input, List, Radio, Row, Select } from 'antd';
import { Formik } from 'formik';
import './admin_calendar.less';

const AdminCalendar: React.FC = () => {
    const [contents, setContents]: any = useState([]);
    return (
        <div className='admin__calendar'>
            <Formik
                initialValues={{
                    contentThematicIds: [],
                    contentDirectionId: '',
                    contentFormats: [],
                }}
                validateOnBlur
                onSubmit={async (values) => console.log(values)}>
                <Row>
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Тематика контента*"><Select mode='multiple' placeholder='Выберите тематику контента'></Select></Descriptions.Item>
                        <Descriptions.Item label="Направление контента*">
                            <Radio.Group defaultValue={1}>
                                <Radio value={1}>Мультиформат</Radio>
                                <Radio value={2}>Видеоконтент</Radio>
                                <Radio value={3}>Контент в блогосфере</Radio>
                                <Radio value={4}>Программные продукты</Radio>
                            </Radio.Group>
                        </Descriptions.Item>
                        <Descriptions.Item label="Формат контента*">
                            <List style={{ display: contents.length === 0 ? 'none' : 'block' }}>
                                {contents.map((select: any) => (
                                    <List.Item key={select.id} actions={[<DeleteOutlined onClick={() => setContents(contents.filter((content: any) => content.id !== select.id))} />]}>
                                        <Select placeholder={select.info}></Select>
                                        <Input type='number' placeholder={select.num}></Input>
                                        <Select placeholder={select.type}></Select>
                                    </List.Item>
                                ))}
                            </List>
                            <Button onClick={() => setContents([...contents, { id: Math.random(), info: 'Выберите контент', num: 'Введите число', type: 'Выберите тип' }])} type='link' icon={<PlusCircleOutlined />}>Добавить тип контента</Button>
                        </Descriptions.Item>
                    </Descriptions>
                </Row>
            </Formik>
        </div >
    );
}

export default AdminCalendar;


















