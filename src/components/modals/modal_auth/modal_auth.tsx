import { UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { Form, FormItem, Input as FormInput, SubmitButton } from 'formik-antd';
import { Button, notification, Spin, Typography } from 'antd';
import './modal_auth.less';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus, selectSuccess } from '../../../store/login/selectors';
import * as Yup from 'yup';
import { GetPage } from '../../../store/products/actions';
import { RemoveAllFilters } from '../../../store/filters/actions';
import { GetAuthorizationStartAction } from '../../../store/login/actions';
import { CloseModalAction, OpenModalAction } from '../../../store/modals/actions';
import { selectPageSize } from '../../../store/products/selectors';

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
    const { error, isLoading } = useSelector(selectStatus);
    const isSuccess = useSelector(selectSuccess);
    const pageSize = useSelector(selectPageSize);
    const load = async () => {
        setTimeout(() => {
            dispatch(GetPage(1, pageSize))
            dispatch(RemoveAllFilters())
            dispatch(CloseModalAction())
        }, 1000)
    }
    return (
        <>
            <Modal
                width={530}
                title={<Title style={error ? { color: 'red' } : {}} level={4}>{error ? 'Incorrect email or password' : 'Authorization'}</Title>}
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
                                        <SubmitButton loading={!!isLoading} onClick={load}>Войти</SubmitButton>
                                    </Button.Group>
                                    <Button type='link' onClick={() => dispatch(OpenModalAction("Registration"))}>Зарегистрироваться</Button>
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