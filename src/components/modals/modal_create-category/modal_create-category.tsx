import { Form, Input, SubmitButton } from 'formik-antd';
import React, { ChangeEvent, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addedCategory } from '../../../store/filters/actions';
import { CloseModalAction } from '../../../store/modals/actions';
import './modal_create-category.less'
import { Button } from 'antd';

type Props = {
    visible: boolean,
    onCancel: () => void
}

const CreateCategorySchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').required('Required')
});

const ModalCreateCategory: React.FC<Props> = ({ visible, onCancel }) => {
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState<string>('');
    const addCategory = () => {
        setTimeout(() => {
            dispatch(addedCategory(categoryName))
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
                    validationSchema={CreateCategorySchema}
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
                            <SubmitButton disabled={categoryName.length === 0 ? true : false}>Создать</SubmitButton>
                            <Button type='dashed' onClick={() => setCategoryName('')}>Clear</Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </Modal >
    )
}

export default ModalCreateCategory