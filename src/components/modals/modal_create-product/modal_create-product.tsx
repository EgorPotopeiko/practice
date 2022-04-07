import { Button, Select, Upload } from 'antd';
import { Form, SubmitButton, Input as FormInput } from 'formik-antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import ImgCrop from 'antd-img-crop';
import * as Yup from 'yup';
import { customAlphabet } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { selectListCategories } from '../../../store/category/selectors';
import { CreateProductAction } from '../../../store/products/actions';
import { getBase64 } from '../../../services/getBase64';
import './modal_create-product.less';
import { CloseModalAction, OpenModalAction } from '../../../store/modals/actions';

interface Props {
    visible: boolean,
    onCancel: () => void
}

type TCreateProductState = {
    loading: boolean
    img64: string | null
}

const { Option } = Select;

const CreateProductSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Too Short!').required('Required'),
    prise: Yup.number().positive().required('Required'),
    category: Yup.array().required('Required'),
    img: Yup.string()
});

const props = { headers: { "Access-Control-Allow-Origin": 'http://localhost:3000' } }

const ModalCreateProduct: React.FC<Props> = ({ visible, onCancel }) => {
    const [filter, setFilter] = useState<TCreateProductState>({
        loading: false,
        img64: null
    });
    const [fileList, setFileList] = useState([])
    const createFilter = (type: keyof TCreateProductState) => (value: any) => {
        setFilter({
            ...filter,
            [type]: value
        })
    }
    const nanoid = customAlphabet('1234567890', 6);
    const dispatch = useDispatch();
    const categoryValues = useSelector(selectListCategories);
    const filterCategories = categoryValues.filter((item: string) => item !== 'all');
    const createProduct = (values: any) => {
        createFilter("loading")(true)
        setTimeout(() => {
            values.img = filter.img64
            values.id = nanoid()
            values.key = values.id
            dispatch(CreateProductAction(values))
            createFilter("loading")(false)
            dispatch(CloseModalAction())
        }, 3000)
    }
    const onChange = ({ fileList: newFileList }: { fileList: any }) => {
        setFileList(newFileList);
        const newFile = newFileList[newFileList.length - 1];
        getBase64(newFile.originFileObj, (imageURL: any) => { createFilter("img64")(imageURL) })
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
                    initialValues={{ title: '', prise: '', category: [], img: '' }}
                    validateOnBlur
                    validationSchema={CreateProductSchema}
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
                            <Form.Item name='prise'>
                                <FormInput
                                    type='number'
                                    required={true}
                                    name='prise'
                                    placeholder='Стоимость'
                                />
                            </Form.Item>
                            <Form.Item name='category'>
                                <Select placeholder='Категории' mode='multiple' onChange={(item) => { setFieldValue('category', [...item]) }}>
                                    {filterCategories.map((item: any) => (
                                        <Option key={item} value={item}>{item}</Option>
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
                            <SubmitButton loading={filter.loading} disabled={values.category.length === 0}>Создать</SubmitButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal >
    )
}

export default ModalCreateProduct