import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { Form, FormItem, Input as FormInput, SubmitButton } from 'formik-antd';
import { Button, Spin, Typography } from 'antd';
import { selectStateStatus } from '../../../store/login/selectors';
import { GetAuthorizationStartAction, SetStatus } from '../../../store/login/actions';
import { OpenModalAction } from '../../../store/modals/actions';
import signupSchema from './schema';
import './modal_auth.less';

type Props = {
    visible: boolean,
    onCancel: () => void
}

const { Title } = Typography

const ModalAuth: React.FC<Props> = ({ visible, onCancel }) => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(selectStateStatus);
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
                            validationSchema={signupSchema}
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
                                        dispatch(SetStatus(''))
                                    }}>Зарегистрироваться</Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Spin>
            </Modal>
        </>
    )
}

export default ModalAuth