import React, { useState } from 'react';
import { DeleteOutlined, LinkOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, Input, List, Row, Select, Upload } from 'antd';
import { Formik } from 'formik';
import './admin_internet.less';

const AdminInternet: React.FC = () => {
    const [channels, setChannels]: any = useState([])
    const [kpis, setKpis]: any = useState([]);
    return (
        <div className='admin__internet'>
            <Formik
                initialValues={{
                    channels: [],
                    kpis: [],
                    imageId: ''
                }}
                validateOnBlur
                onSubmit={async (values) => console.log(values)}>
                <Row>
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Добавить интернет-ресурс">
                            <List style={{ display: channels.length === 0 ? 'none' : 'block' }}>
                                {channels.map((select: any) => (
                                    <List.Item key={select.id} actions={[<DeleteOutlined onClick={() => setChannels(channels.filter((channel: any) => channel.id !== select.id))} />]}>
                                        <Select placeholder={select.resource}></Select>
                                        <Input placeholder={select.title}></Input>
                                        <Input placeholder={select.description}></Input>
                                        <Input type='number' placeholder={select.amount}></Input>
                                    </List.Item>
                                ))}
                            </List>
                            <Button type='link' onClick={() => setChannels([...channels, { id: Math.random(), resource: 'Добавить ресурс', title: 'Выберите заголовок', description: 'Выберите описание', amount: 0 }])} icon={<PlusCircleOutlined />}>Добавить интернет-ресурс</Button>
                        </Descriptions.Item>
                        <Descriptions.Item label="Плановый КПЭ*">
                            <List style={{ display: kpis.length === 0 ? 'none' : 'block' }}>
                                {kpis.map((select: any) => (
                                    <List.Item key={select.id} actions={[<DeleteOutlined onClick={() => setKpis(kpis.filter((kpis: any) => kpis.id !== select.id))} />]}>
                                        <Input placeholder={select.views}></Input>
                                        <Select placeholder={select.amount}></Select>
                                    </List.Item>
                                ))}
                            </List>
                            <Button onClick={() => setKpis([...kpis, { id: Math.random(), views: 'Показатель просмотров', amount: 0 }])} type='link' icon={<PlusCircleOutlined />}>Добавить плановый КПЭ</Button>
                        </Descriptions.Item>
                        <Descriptions.Item label="Изображение проекта">
                            <Upload>
                                <Button type='link' icon={<LinkOutlined />}>Добавить изображение</Button>
                            </Upload>
                        </Descriptions.Item>
                    </Descriptions>
                </Row>
            </Formik>
        </div >
    );
}

export default AdminInternet;


















