import { UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { Form, FormItem, Input as FormInput, SubmitButton } from 'formik-antd';
import { Button, Typography } from 'antd';
import './modal_auth.less';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError } from '../../../store/login/selectors';
import * as Yup from 'yup';
import { GetPage } from '../../../store/products/actions';
import { RemoveAllFilters } from '../../../store/filters/actions';
import { GetAuthorizationStartAction } from '../../../store/login/actions';
import { CloseModalAction } from '../../../store/modals/actions';
import { selectPageSize } from '../../../store/products/selectors';

interface Props {
    visible: boolean,
    onCancel: () => void
}

const { Title } = Typography

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(3, 'Too Short!').required('Required'),
});

const ModalAuth: React.FC<Props> = ({ visible, onCancel }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const error = useSelector(selectError);
    const pageSize = useSelector(selectPageSize);
    const load = async () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            dispatch(GetPage(1, pageSize))
            dispatch(RemoveAllFilters())
            dispatch(CloseModalAction())
        }, 3000)
    }
    return (
        <Modal
            width={530}
            title={<Title style={error ? { color: 'red' } : {}} level={4}>{error ? 'Incorrect email or password' : 'Authorization'}</Title>}
            visible={visible}
            onCancel={onCancel}
            footer={null}>
            <div className='modal__auth'>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validateOnBlur
                    validationSchema={SignupSchema}
                    onSubmit={async (values) => setTimeout(() => { dispatch(GetAuthorizationStartAction(values.email, values.password)) }, 3000)}>
                    {(formic) => (
                        <Form >
                            <FormItem name='email'>
                                <FormInput
                                    name='email'
                                    required={true}
                                    placeholder='Email'
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                />
                            </FormItem>
                            <FormItem name='password'>
                                <FormInput.Password
                                    name='password'
                                    required={true}
                                    placeholder='Password'
                                />
                            </FormItem>
                            <Button.Group><SubmitButton loading={loading} onClick={load}>Войти</SubmitButton></Button.Group>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    )
}

export default ModalAuth