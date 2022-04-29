import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Formik, FormikValues } from 'formik';
import { Form, FormItem, Input as FormInput, SubmitButton } from 'formik-antd';
import { Button, Checkbox, Spin, Typography } from 'antd';
import { selectStateStatus } from '../../../store/login/selectors';
import { GetRegistrationAdminStartAction, GetRegistrationStartAction } from '../../../store/login/actions';
import registrationSchema from "./schema";
import './modal_registration.less';

const { Title } = Typography;

type Props = {
    visible: boolean,
    onCancel: () => void
}

const ModalRegistration: React.FC<Props> = ({ visible, onCancel }) => {
    const { isLoading } = useSelector(selectStateStatus);
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const initialValues = {
        email: '',
        password: '',
        name: '',
        secret: ''
    }
    const handlerSubmit = (values: FormikValues) => {
        { isAdmin && dispatch(GetRegistrationAdminStartAction(values.name, values.email, values.password, values.secret)) }
        { !isAdmin && dispatch(GetRegistrationStartAction(values.name, values.email, values.password)) }
    }
    return (
        <>
            <Modal
                width={530}
                title={<Title level={3}>Registration</Title>}
                visible={visible}
                onCancel={onCancel}
                footer={null}>
                <Spin spinning={isLoading}>
                    <div className='modal__registration'>
                        <Formik
                            initialValues={initialValues}
                            validateOnBlur
                            validationSchema={registrationSchema}
                            onSubmit={handlerSubmit}>
                            {(_formic) => (
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
                                    <FormItem name='secret' hidden={!isAdmin}>
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