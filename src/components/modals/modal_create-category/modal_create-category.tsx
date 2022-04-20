import { Form, Input, SubmitButton } from 'formik-antd';
import React, { ChangeEvent, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { CloseModalAction } from '../../../store/modals/actions';
import './modal_create-category.less'
import { Button } from 'antd';
import { CreateCategoryStartAction } from '../../../store/category/actions';
import createCategorySchema from './schema';

type Props = {
    visible: boolean,
    onCancel: () => void
}

const ModalCreateCategory: React.FC<Props> = ({ visible, onCancel }) => {
    const [categoryName, setCategoryName] = useState<string>('');
    const dispatch = useDispatch();
    const addCategory = () => {
        setTimeout(() => {
            dispatch(CreateCategoryStartAction(categoryName))
            setCategoryName('')
            dispatch(CloseModalAction())
        }, 1000)
    }
    return (
        <Modal
            title="Создание новой категории"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={600}>
            <div className='modal__create-category'>
                <Formik
                    initialValues={{ name: '' }}
                    validateOnBlur
                    validationSchema={createCategorySchema}
                    onSubmit={() => { addCategory() }}>
                    <Form>
                        <Form.Item name='name'>
                            <Input
                                name='name'
                                placeholder='Название категории'
                                value={categoryName}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)} />
                        </Form.Item>
                        <div className='modal__create-category-btns'>
                            <SubmitButton disabled={!categoryName.length}>Создать</SubmitButton>
                            <Button type='dashed' onClick={() => setCategoryName('')}>Clear</Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </Modal >
    )
}

export default ModalCreateCategory