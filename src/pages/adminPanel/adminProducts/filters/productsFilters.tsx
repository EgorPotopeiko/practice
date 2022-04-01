/* eslint-disable array-callback-return */
import { Button, Input, Select, Upload } from 'antd';
import { Form, SubmitButton, Input as FormInput } from 'formik-antd';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import './ProductsFilters.less';
import Modal from 'antd/lib/modal/Modal';
import { customAlphabet } from 'nanoid';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { selectValues } from '../../../../components/header/Header'
import { addProduct, setProducts } from '../../../../store/products/actions';
import axios from 'axios';

interface Props {
    setSearchName: React.Dispatch<React.SetStateAction<string>>,
    setSearchArticle: React.Dispatch<React.SetStateAction<string>>,
    setSearchCategory: React.Dispatch<React.SetStateAction<string>>,
    setSearchStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const { Option } = Select;

const validate = (value: any) => {
    if (!value) {
        return "Required!";
    }
}

const createDate = () => {
    const date = new Date();
    const yyyy = date.getFullYear()
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    const finishDate = mm + '/' + dd + '/' + yyyy
    return finishDate
}

const ProductsFilter: React.FC<Props> = ({ setSearchName, setSearchArticle, setSearchCategory, setSearchStatus }) => {
    const products = useSelector((state: RootStateOrAny) => state.productsReducer.products);
    const [visible, setVisible] = useState(false);
    const [fileList, setFileList]: any = useState([]);
    const formData = new FormData();
    const [upLoading, setUpLoading] = useState(false);
    const dispatch = useDispatch()
    const categoryValues = useSelector((state: RootStateOrAny) => state.filterReducer.listCategories);
    const filterCategories = categoryValues.filter((item: any) => item !== 'all')
    const onCancel = () => {
        setVisible(false)
    }
    const createProduct = (values: any) => {
        setTimeout(() => {
            const nanoid_8 = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8)
            const nanoid_4 = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 4)
            const nanoid_12 = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12)
            values.id = `${nanoid_8()}-${nanoid_4()}-${nanoid_4()}-${nanoid_4()}-${nanoid_12()}`
            values.date = createDate()
            values.available = values.available === 'true' ? true : false
            dispatch(addProduct(values))
            setVisible(false)
        }, 3000)
    }
    const handleUpload = async () => {
        fileList.forEach((file: any) => {
            formData.append('files[]', file);
        });
        setUpLoading(true)
        fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(() => {
                setFileList([])
                console.log('upload successfully.');
            })
            .catch(() => {
                console.log('upload failed.');
            })
            .finally(() => {
                setUpLoading(false)
            });
    }
    const props = {
        onRemove: (file: any) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList)
        },
        beforeUpload: async (file: any) => {
            const res = await axios.get(`http://localhost:3000/db/${file.name}`);
            dispatch(setProducts(res.data))
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };
    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products))
    }, [products])
    return (
        <div className="admin__filters">
            <div className='admin__filters-block'>
                <Input placeholder="Название" onChange={(e) => setSearchName(e.target.value)} />
                <Input placeholder="Артикул" onChange={(e) => setSearchArticle(e.target.value)} />
                <Select placeholder="Категория" onChange={(category) => setSearchCategory(category)}>
                    {categoryValues.map((item: any) => (
                        <Option key={item} value={item}>{item}</Option>
                    ))}
                </Select>
                <Select placeholder="Статус" onChange={(status) => setSearchStatus(status)}>
                    <Option key="true" value={true}>{"Есть на складе"}</Option>
                    <Option key="false" value={false}>{"Нет на складе"}</Option>
                </Select>
            </div>
            <div className='admin__filters-btns'>
                <Button type='default' onClick={() => setVisible(true)}>Добавить новый товар</Button>
                <Upload {...props}>
                    <Button type='primary' onClick={handleUpload} loading={upLoading}>Импорт</Button>
                </Upload>
            </div>
            <Modal title="Создание нового товара" visible={visible} onCancel={onCancel} footer={null} width={600}>
                <div className='admin__createModal'>
                    <Formik initialValues={{ title: '', description: '', cost: '', available: 'true', maker: '', category: '', subcategory: '' }} validateOnBlur onSubmit={(values) => createProduct(values)}>
                        {() => (
                            <Form>
                                <Form.Item name='title' validate={validate}>
                                    <FormInput
                                        name='title'
                                        required={true}
                                        placeholder='Название товара'
                                    />
                                </Form.Item>
                                <Form.Item name='cost' validate={validate}>
                                    <FormInput
                                        type='number'
                                        required={true}
                                        name='cost'
                                        placeholder='Стоимость'
                                    />
                                </Form.Item>
                                <Form.Item name='available' validate={validate}>
                                    <Field as="select" name="available">
                                        <option value="true">Есть на складе</option>
                                        <option value="false">Нет на складе</option>
                                    </Field>
                                </Form.Item>
                                <Form.Item name='maker' validate={validate}>
                                    <Field as="select" name="maker">
                                        {selectValues.map((item: any) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </Field>
                                </Form.Item>
                                <Form.Item name='category' validate={validate}>
                                    <Field as="select" name="category">
                                        {filterCategories.map((item: any) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </Field>
                                </Form.Item>
                                <Form.Item name='subcategory'>
                                    <FormInput
                                        name='subcategory'
                                        placeholder='Подкатегория'
                                    />
                                </Form.Item>
                                <Form.Item name='description' validate={validate}>
                                    <FormInput.TextArea
                                        name='description'
                                        required={true}
                                        placeholder='Описание'
                                    />
                                </Form.Item>
                                <SubmitButton>Создать</SubmitButton>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </div>
    );
}

export default ProductsFilter;