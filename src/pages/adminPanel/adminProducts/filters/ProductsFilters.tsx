import { Button, Input, Select, Upload } from 'antd';
import { Form, SubmitButton, Input as FormInput } from 'formik-antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import './ProductsFilters.less';
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
    setSearchName: React.Dispatch<React.SetStateAction<string>>,
    setSearchArticle: React.Dispatch<React.SetStateAction<string>>,
    setSearchCategory: React.Dispatch<React.SetStateAction<string>>,
    setSearchStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const { Option } = Select;

const CreateProductSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .required('Required'),
    prise: Yup.number()
        .positive()
        .required('Required'),
    category: Yup.array().required('Required'),
    img: Yup.string()
});

const props = {
    headers: {
        "Access-Control-Allow-Origin": 'http://localhost:3000'
    }
}

const ProductsFilter: React.FC<Props> = ({ handlerFilter, setSearchName, setSearchArticle, setSearchCategory }) => {
    const nanoid = customAlphabet('1234567890', 6);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [img64, setImg64] = useState(null);
    const [visible, setVisible] = useState(false);
    const [fileList, setFileList] = useState([]);
    // const formData = new FormData();
    // const [upLoading, setUpLoading] = useState(false);
    const categoryValues = useSelector(selectUserMenu);
    const filterCategories = categoryValues.filter((item: string) => item !== 'all');
    const onCancel = () => {
        setVisible(false)
    }
    const createProduct = (values: any) => {
        setLoading(true)
        setTimeout(() => {
            values.img = img64
            values.id = nanoid()
            values.key = values.id
            dispatch(CreateProductAction(values))
            setLoading(false)
            setVisible(false)
        }, 3000)
    }
    // const handleUpload = async () => {
    //     filesList.forEach((file: any) => {
    //         formData.append('files[]', file);
    //     });
    //     setUpLoading(true)
    //     fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
    //         method: 'POST',
    //         body: formData,
    //     })
    //         .then(res => res.json())
    //         .then(() => {
    //             setFilesList([])
    //             console.log('upload successfully.');
    //         })
    //         .catch(() => {
    //             console.log('upload failed.');
    //         })
    //         .finally(() => {
    //             setUpLoading(false)
    //         });
    // }
    const onChange = ({ fileList: newFileList }: { fileList: any }) => {
        setFileList(newFileList);
        const newFile = newFileList[newFileList.length - 1];
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
    // const props = {
    //     onRemove: (file: any) => {
    //         const index = filesList.indexOf(file);
    //         const newFileList = filesList.slice();
    //         newFileList.splice(index, 1);
    //         setFileList(newFileList)
    //     },
    //     beforeUpload: async (file: any) => {
    //         setFilesList([...filesList, file]);
    //         return false;
    //     },
    //     filesList,
    // };

    return (
        <div className="admin__filters">
            <div className='admin__filters-block'>
                <Input
                    placeholder="Название"
                    onChange={(e) => handlerFilter("searchName")(e.target.value)}
                />
                <Input placeholder="Артикул" onChange={(e) => setSearchArticle(e.target.value)} />
                <Select placeholder="Категория" onChange={(category) => setSearchCategory(category)}>
                    {categoryValues.map((item: any) => (
                        <Option key={item} value={item}>{item}</Option>
                    ))}
                </Select>
            </div>
            <div className='admin__filters-btns'>
                <Button type='default' onClick={() => setVisible(true)}>Добавить новый товар</Button>
                {/* <Upload {...props}>
                    <Button type='primary' onClick={handleUpload} loading={upLoading}>Импорт</Button>
                </Upload> */}
            </div>
            <Modal title="Создание нового товара" visible={visible} onCancel={onCancel} footer={null} width={700}>
                <div className='admin__create-modal'>
                    <Formik
                        initialValues={{ title: '', prise: '', category: [], img: '' }}
                        validateOnBlur
                        validationSchema={CreateProductSchema}
                        onSubmit={(values) => {
                            createProduct(values)
                        }}>
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
                                            fileList={fileList}
                                            // beforeUpload={() => {
                                            //     return false
                                            // }}
                                            onChange={onChange}
                                            onPreview={onPreview}
                                            disabled={fileList.length > 0}
                                            {...props}
                                        >
                                            {fileList.length < 5 && '+ Upload'}
                                        </Upload>
                                    </ImgCrop>

                                </Form.Item>
                                <SubmitButton loading={loading}
                                    disabled={values.category.length === 0}
                                >Создать</SubmitButton>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal >
        </div >
    );
}

export default ProductsFilter;