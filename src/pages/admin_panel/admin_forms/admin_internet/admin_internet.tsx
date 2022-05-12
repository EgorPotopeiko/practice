import React, { useState, FC } from 'react';
import { FieldArray } from 'formik';
import { Form } from 'formik-antd';
import { Button, Descriptions, List, Row, Upload } from 'antd';
import { DeleteOutlined, LinkOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import FormikSelect from '../components/select/select';
import FormikInput from '../components/input/input';
import { Channel, Kpi } from '../models';
import './admin_internet.less';

type Props = {
    formik: any
}

const optionsChannels = [
    {
        key: 'Instagram',
        value: '1139095093901'
    },
    {
        key: 'Facebook',
        value: '403094801'
    },
    {
        key: 'Twitter',
        value: '490-3294-596'
    }
]

const optionsKpis = [
    {
        key: 'Просмотров',
        value: '121890318909310'
    },
    {
        key: 'Прослушиваний',
        value: '1213901913'
    },
    {
        key: 'Скачиваний',
        value: '3131584064'
    }
]

const props = { headers: { "Access-Control-Allow-Origin": 'http://localhost:3000' } };

const AdminInternet: FC<Props> = ({ formik }) => {
    const [fileList, setFileList] = useState([]);
    const { values, setFieldValue } = formik;
    const onChange = ({ fileList: newFileList }: { fileList: any }) => {
        setFileList(newFileList);
        setFieldValue('imageId', ...newFileList)
    };
    const onPreview = async (file: any) => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src)!;
        imgWindow.document.write(image.outerHTML);
    };
    return (
        <div className='admin__internet'>
            <Row>
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Добавить интернет-ресурс">
                        <FieldArray name='channels'>
                            {({ push, remove }) => (
                                <List>
                                    {values.channels.map((_channel: Channel, index: number) => (
                                        <List.Item key={index} actions={[<DeleteOutlined onClick={() => remove(index)} />]}>
                                            <FormikSelect
                                                name={`channels.${index}.internetResourceId`}
                                                placeholder='Выберите интернет-ресурс'
                                                required={true}
                                                options={optionsChannels} />
                                            <FormikInput
                                                name={`channels.${index}.name`}
                                                placeholder='Введите название' />
                                            <FormikInput
                                                name={`channels.${index}.link`}
                                                placeholder='Введите ссылки' />
                                            <FormikInput
                                                name={`channels.${index}.planPublicationCount`}
                                                type='number'
                                                placeholder='Введите количество публикаций' />
                                        </List.Item>
                                    ))}
                                    <Button
                                        onClick={() => push({
                                            id: nanoid(),
                                            name: '',
                                            link: '',
                                            planPublicationCount: 0,
                                            internetResourceId: ''
                                        })}
                                        type='link'
                                        icon={<PlusCircleOutlined />}>Добавить интернет-ресурс</Button>
                                </List>
                            )}
                        </FieldArray>
                    </Descriptions.Item>
                    <Descriptions.Item label="Плановый КПЭ*">
                        <FieldArray name='kpis'>
                            {({ push, remove }) => (
                                <List>
                                    {values.kpis.map((_kpi: Kpi, index: number) => (
                                        <List.Item key={index} actions={[<DeleteOutlined onClick={() => remove(index)} />]}>
                                            <FormikInput
                                                name={`kpis.${index}.planCount`}
                                                type='number'
                                                placeholder='Введите показатель просмотров' />
                                            <FormikSelect
                                                name={`kpis.${index}.typeId`}
                                                placeholder='Выберите меру измерения КПЭ'
                                                required={true}
                                                options={optionsKpis} />
                                        </List.Item>
                                    ))}
                                    <Button
                                        onClick={() => push({ id: nanoid(), planCount: 0, typeId: '' })}
                                        type='link'
                                        icon={<PlusCircleOutlined />}>Добавить плановый КПЭ</Button>
                                </List>
                            )}
                        </FieldArray>
                    </Descriptions.Item>
                    <Descriptions.Item label="Изображение проекта">
                        <Form.Item name='imageId'>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                accept='.png'
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                                disabled={fileList.length > 0}
                                {...props}
                            >
                                {fileList.length < 5 && <><LinkOutlined />Добавить изображение</>}
                            </Upload>
                        </Form.Item>
                    </Descriptions.Item>
                </Descriptions>
            </Row>
        </div >
    );
}

export default AdminInternet;


















