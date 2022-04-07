import { Button, Input, Select, Upload } from 'antd';
import { Form, SubmitButton, Input as FormInput } from 'formik-antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import './products_filters.less';
import Modal from 'antd/lib/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserMenu } from '../../../../store/filters/selectors';
import ImgCrop from 'antd-img-crop';
import { getBase64 } from '../../../../services/getBase64';
import { customAlphabet } from 'nanoid';
import { TMenuState } from "../../../../components/menu/Menu";
import * as Yup from 'yup';
import { CreateProductAction } from '../../../../store/products/actions';

type Props = {
    handlerFilter: (type: keyof TMenuState) => (value: string | boolean) => void
}

type TCreateProductState = {
    loading: boolean
    img64: string | null
    visible: boolean
}

const { Option } = Select;

const CreateProductSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Too Short!').required('Required'),
    prise: Yup.number().positive().required('Required'),
    category: Yup.array().required('Required'),
    img: Yup.string()
});

const props = { headers: { "Access-Control-Allow-Origin": 'http://localhost:3000' } }

const ProductsFilter: React.FC<Props> = ({ handlerFilter }) => {
    const [filter, setFilter] = useState<TCreateProductState>({
        loading: false,
        img64: null,
        visible: false
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
    const categoryValues = useSelector(selectUserMenu);
    const filterCategories = categoryValues.filter((item: string) => item !== 'all');
    const onCancel = () => { createFilter("visible")(false) };
    const createProduct = (values: any) => {
        createFilter("loading")(true)
        setTimeout(() => {
            values.img = filter.img64
            values.id = nanoid()
            values.key = values.id
            dispatch(CreateProductAction(values))
            createFilter("loading")(false)
            createFilter("visible")(false)
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
        <div className="admin__filters">
            <div className='admin__filters-block'>
                <Input placeholder="Название" onChange={(e) => handlerFilter("searchName")(e.target.value)} />
                <Input placeholder="Артикул" onChange={(e) => handlerFilter("searchArticle")(e.target.value)} />
                <Select placeholder="Категория" onChange={(category) => handlerFilter("searchCategory")(category)}>
                    {categoryValues.map((item: any) => (
                        <Option key={item} value={item}>{item}</Option>
                    ))}
                </Select>
            </div>
            <div className='admin__filters-btns'>
                <Button type='default' onClick={() => createFilter("visible")(true)}>Добавить новый товар</Button>
            </div>
            <Modal
                title="Создание нового товара"
                visible={filter.visible}
                onCancel={onCancel}
                footer={null}
                width={700}>
                <div className='admin__create-modal'>
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
                                    <Select mode='multiple' onChange={(item) => {
                                        setFieldValue('category', [...item])
                                    }}>
                                        {filterCategories.map((item: any) => (
                                            <Option key={item} value={item}>{item}</Option>
                                        ))}
                                    </Select>
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
        </div >
    );
}

export default ProductsFilter;