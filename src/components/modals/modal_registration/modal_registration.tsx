import { MailOutlined, UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { Form, FormItem, Input as FormInput, SubmitButton } from 'formik-antd';
import { Button, notification, Spin, Typography } from 'antd';
import './modal_registration.less';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus, selectSuccess } from '../../../store/login/selectors';
import * as Yup from 'yup';
import { GetRegistrationStartAction } from '../../../store/login/actions';
import { OpenModalAction } from '../../../store/modals/actions';

type Props = {
    visible: boolean,
    onCancel: () => void
}

const { Title } = Typography

const RegistrationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short name').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(5, 'Too Short!').required('Required'),
});

const ModalRegistration: React.FC<Props> = ({ visible, onCancel }) => {
    const { isLoading } = useSelector(selectStatus);
    const isSuccess = useSelector(selectSuccess);
    const dispatch = useDispatch();
    const btn = (
        <Button type='primary' onClick={() => dispatch(OpenModalAction('Auth'))}>Перейти к авторизации</Button>
    )
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
                            initialValues={{ email: '', password: '', name: '' }}
                            validateOnBlur
                            validationSchema={RegistrationSchema}
                            onSubmit={async (values) => {
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
                                    <Button.Group><SubmitButton loading={isLoading}>Зарегистрироваться</SubmitButton></Button.Group>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Spin>
            </Modal>
            {isSuccess === 'Success' &&
                notification.open({
                    message: 'Done',
                    type: 'success',
                    description:
                        'Регистрация завершена успешно',
                    btn
                })
            }
            {isSuccess === 'Error' &&
                notification.open({
                    message: 'Error',
                    type: 'error',
                    description:
                        'Такой пользователь уже существует'
                })
            }
        </>
    )
}

export default ModalRegistration