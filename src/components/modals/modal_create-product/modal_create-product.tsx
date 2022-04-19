/* eslint-disable array-callback-return */
import { Button, Select, Upload } from 'antd';
import { Form, SubmitButton, Input as FormInput } from 'formik-antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import ImgCrop from 'antd-img-crop';
import { useDispatch, useSelector } from 'react-redux';
import { selectListCategories } from '../../../store/category/selectors';
import { CreateProductStartAction } from '../../../store/products/actions';
import { getBase64 } from '../../../services/getBase64';
import './modal_create-product.less';
import { CloseModalAction, OpenModalAction } from '../../../store/modals/actions';
import { TCategory } from '../../../models/category';
import createProductSchema from './schema';

type Props = {
    visible: boolean,
    onCancel: () => void
}

export type TValues = {
    title: string,
    price: number,
    categories: Array<{ id: number }>,
    img: string | null
}

type TCreateProductState = {
    loading: boolean,
    img64: string | null
}

const { Option } = Select;

const props = { headers: { "Access-Control-Allow-Origin": 'http://localhost:3000' } };

const ModalCreateProduct: React.FC<Props> = ({ visible, onCancel }) => {
    const categoryValues = useSelector(selectListCategories);
    const [testImg, setTestImg] = useState('');
    const [filter, setFilter] = useState<TCreateProductState>({
        loading: false,
        img64: null
    });
    const [fileList, setFileList] = useState([]);
    const createFilter = (type: keyof TCreateProductState) => (value: any) => {
        setFilter({
            ...filter,
            [type]: value
        })
    };
    const dispatch = useDispatch();
    const createProduct = (values: TValues) => {
        createFilter("loading")(true)
        setTimeout(() => {
            values.img = filter.img64
            dispatch(CreateProductStartAction(values))
            createFilter("loading")(false)
            dispatch(CloseModalAction())
        }, 3000)
    };
    const onChange = ({ fileList: newFileList }: { fileList: any }) => {
        setFileList(newFileList);
        const newFile = newFileList[newFileList.length - 1];
        getBase64(newFile.originFileObj, (imageURL: string) => {
            createFilter("img64")(imageURL)
            setTestImg(imageURL)
        })
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
        <Modal
            title="Создание нового товара"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={700}>
            <div className='modal__create-product'>
                <Formik
                    initialValues={{ title: '', price: 0, categories: [], img: testImg }}
                    validateOnBlur
                    validationSchema={createProductSchema}
                    onSubmit={(values) => { createProduct(values) }}>
                    {({ values, setFieldValue }) => (
                        <Form>
                            <Form.Item name='title'>
                                <FormInput
                                    name='title'
                                    required={true}
                                    placeholder='Название товара'
                                />
                            </Form.Item>
                            <Form.Item name='price'>
                                <FormInput
                                    min={1}
                                    type='number'
                                    required={true}
                                    name='price'
                                    placeholder='Стоимость'
                                />
                            </Form.Item>
                            <Form.Item name='categories'>
                                <Select
                                    placeholder='Категории'
                                    mode='multiple'
                                    onChange={(value) => {
                                        value.map((valuesId: string) => {
                                            categoryValues.map((category: TCategory) => {
                                                if (category.title === valuesId) setFieldValue('categories', [...values.categories, { id: category.id }])
                                            })
                                        })

                                    }}>
                                    {categoryValues.map((category: TCategory) => (
                                        <Option key={category.title} value={category.title}>{category.title}</Option>
                                    ))}
                                </Select>
                                <Button type='link' onClick={() => dispatch(OpenModalAction("CreateCategory"))}>Нет подходящей категории? Создайте свою</Button>
                            </Form.Item>
                            <Form.Item name='img'>
                                <ImgCrop rotate>
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        accept='.jpg'
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={onChange}
                                        onPreview={onPreview}
                                        disabled={fileList.length > 0}
                                        {...props}
                                    >
                                        {fileList.length < 5 && '+ Upload'}
                                    </Upload>
                                </ImgCrop>
                            </Form.Item>
                            <SubmitButton>Создать</SubmitButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal >
    )
}

export default ModalCreateProduct