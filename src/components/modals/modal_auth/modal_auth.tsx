import { UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { Form, FormItem, Input as FormInput, SubmitButton } from 'formik-antd';
import { Button, notification, Spin, Typography } from 'antd';
import './modal_auth.less';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus, selectSuccess } from '../../../store/login/selectors';
import * as Yup from 'yup';
import { GetAuthorizationStartAction, SetSuccess } from '../../../store/login/actions';
import { OpenModalAction } from '../../../store/modals/actions';

type Props = {
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
    const { isLoading } = useSelector(selectStatus);
    const isSuccess = useSelector(selectSuccess);
    return (
        <>
            <Modal
                width={530}
                title={<Title level={3}>Authorization</Title>}
                visible={visible}
                onCancel={onCancel}
                footer={null}>
                <Spin spinning={!!isLoading}>
                    <div className='modal__auth'>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validateOnBlur
                            validationSchema={SignupSchema}
                            onSubmit={async (values) => dispatch(GetAuthorizationStartAction(values.email, values.password))}>
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
                                    <Button.Group>
                                        <SubmitButton loading={!!isLoading}>Войти</SubmitButton>
                                    </Button.Group>
                                    <Button type='link' onClick={() => {
                                        dispatch(OpenModalAction("Registration"))
                                        dispatch(SetSuccess(''))
                                    }}>Зарегистрироваться</Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Spin>
            </Modal>
            {isSuccess === 'Error' &&
                notification.open({
                    message: 'Error',
                    description:
                        'Неверная почта или пароль',
                })
            }
        </>
    )
}

export default ModalAuth