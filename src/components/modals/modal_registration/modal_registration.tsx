import { MailOutlined, UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { Form, FormItem, Input as FormInput, SubmitButton } from 'formik-antd';
import { Button, Checkbox, Spin, Typography } from 'antd';
import './modal_registration.less';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus } from '../../../store/login/selectors';
import * as Yup from 'yup';
import { GetRegistrationAdminStartAction, GetRegistrationStartAction } from '../../../store/login/actions';
import { useState } from 'react';

type Props = {
    visible: boolean,
    onCancel: () => void
}

const { Title } = Typography;

const RegistrationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short name').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(5, 'Too Short!').required('Required'),
    secret: Yup.string()
});

const ModalRegistration: React.FC<Props> = ({ visible, onCancel }) => {
    const { isLoading } = useSelector(selectStatus);
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const initialValues = {
        email: '',
        password: '',
        name: '',
        secret: ''
    }
    return (
        <>
            <Modal
                width={530}
                title={<Title level={3}>Registration</Title>}
                visible={visible}
                onCancel={onCancel}
                footer={null}>
                <Spin spinning={!!isLoading}>
                    <div className='modal__registration'>
                        <Formik
                            initialValues={initialValues}
                            validateOnBlur
                            validationSchema={RegistrationSchema}
                            onSubmit={async (values) => {
                                isAdmin ?
                                    await dispatch(GetRegistrationAdminStartAction(values.name, values.email, values.password, values.secret))
                                    :
                                    await dispatch(GetRegistrationStartAction(values.name, values.email, values.password))
                            }}>
                            {(formic) => (
                                <Form >
                                    <FormItem name='name'>
                                        <FormInput
                                            name='name'
                                            required={true}
                                            placeholder='Name'
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                        />
                                    </FormItem>
                                    <FormItem name='email'>
                                        <FormInput
                                            name='email'
                                            required={true}
                                            placeholder='Email'
                                            prefix={<MailOutlined className="site-form-item-icon" />}
                                        />
                                    </FormItem>
                                    <FormItem name='password'>
                                        <FormInput.Password
                                            name='password'
                                            required={true}
                                            placeholder='Password'
                                        />
                                    </FormItem>
                                    <FormItem name='password'>
                                        <Checkbox onChange={() => setIsAdmin(!isAdmin)}>Регистрация админа</Checkbox>
                                    </FormItem>
                                    <FormItem name='secret' hidden={isAdmin ? false : true}>
                                        <FormInput
                                            name='secret'
                                            placeholder='Secret'
                                        />
                                    </FormItem>
                                    <Button.Group><SubmitButton loading={isLoading}>Зарегистрироваться</SubmitButton></Button.Group>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Spin>
            </Modal>
        </>
    )
}

export default ModalRegistration