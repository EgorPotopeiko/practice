import React from 'react';
import { LinkOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, Row, Upload } from 'antd';
import { Formik } from 'formik';
import './admin_internet.less';

const AdminInternet: React.FC = () => {
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
                            <Upload>
                                <Button type='link' icon={<PlusCircleOutlined />}>Добавить интернет-ресурс</Button>
                            </Upload>
                        </Descriptions.Item>
                        <Descriptions.Item label="Плановый КПЭ*">
                            <Upload>
                                <Button type='link' icon={<PlusCircleOutlined />}>Добавить плановый КПЭ</Button>
                            </Upload>
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


















