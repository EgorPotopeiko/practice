import { Button, Input, Select, Upload } from 'antd';
import { Form, SubmitButton, Input as FormInput } from 'formik-antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import './ProductsFilters.less';
import Modal from 'antd/lib/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserMenu } from '../../../../store/filters/selectors';
import ImgCrop from 'antd-img-crop';
import { ProductsActionTypes } from '../../../../store/products/action-types';
import { getBase64 } from '../../../../services/getBase64';

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

const ProductsFilter: React.FC<Props> = ({ setSearchName, setSearchArticle, setSearchCategory }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [img64, setImg64] = useState(null);
    const [visible, setVisible] = useState(false);
    const [fileList, setFileList]: any = useState([]);
    const [fileListProduct, setFileListProduct]: any = useState([]);
    const formData = new FormData();
    const [upLoading, setUpLoading] = useState(false);
    const categoryValues = useSelector(selectUserMenu);
    const filterCategories = categoryValues.filter((item: any) => item !== 'all');
    const onCancel = () => {
        setVisible(false)
    }
    const createProduct = (values: any) => {
        setLoading(true)
        setTimeout(() => {
            values.img = img64
            dispatch({
                type: ProductsActionTypes.CREATE_PRODUCT,
                product: values
            })
            setLoading(false)
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
    const onChange = ({ fileList: newFileList }: { fileList: any }) => {
        setFileListProduct(newFileList);
        const newFile = newFileList[newFileList.length - 1]
        getBase64(newFile.originFileObj, (imageURL: any) => {
            setImg64(imageURL)
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
    const props = {
        onRemove: (file: any) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList)
        },
        beforeUpload: async (file: any) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };
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
            </div>
            <div className='admin__filters-btns'>
                <Button type='default' onClick={() => setVisible(true)}>Добавить новый товар</Button>
                <Upload {...props}>
                    <Button type='primary' onClick={handleUpload} loading={upLoading}>Импорт</Button>
                </Upload>
            </div>
            <Modal title="Создание нового товара" visible={visible} onCancel={onCancel} footer={null} width={600}>
                <div className='admin__createModal'>
                    <Formik initialValues={{ title: '', prise: '', category: [] }} validateOnBlur onSubmit={(values) => createProduct(values)}>
                        {({ setFieldValue }) => (
                            <Form>
                                <Form.Item name='title' validate={validate}>
                                    <FormInput
                                        name='title'
                                        required={true}
                                        placeholder='Название товара'
                                    />
                                </Form.Item>
                                <Form.Item name='prise' validate={validate}>
                                    <FormInput
                                        type='number'
                                        required={true}
                                        name='prise'
                                        placeholder='Стоимость'
                                    />
                                </Form.Item>
                                <Form.Item name='category'>
                                    <Select onChange={(item) => {
                                        setFieldValue('category', [item])
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
                                            fileList={fileListProduct}
                                            beforeUpload={() => {
                                                return false
                                            }}

                                            onChange={onChange}
                                            onPreview={onPreview}
                                            disabled={fileListProduct.length > 0 ? true : false}
                                        >
                                            {fileList.length < 5 && '+ Upload'}
                                        </Upload>
                                    </ImgCrop>

                                </Form.Item>
                                <SubmitButton loading={loading}>Создать</SubmitButton>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </div>
    );
}

export default ProductsFilter;