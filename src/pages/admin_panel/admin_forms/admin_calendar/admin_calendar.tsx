import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Descriptions, Radio, Row, Select, Upload } from 'antd';
import { Formik } from 'formik';
import './admin_calendar.less';

const AdminCalendar: React.FC = () => {
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
                            <Upload>
                                <Button type='link' icon={<PlusCircleOutlined />}>Добавить тип контента</Button>
                            </Upload>
                        </Descriptions.Item>
                    </Descriptions>
                </Row>
            </Formik>
        </div >
    );
}

export default AdminCalendar;


















