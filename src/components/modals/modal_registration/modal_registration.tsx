import { MailOutlined, UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { Form, FormItem, Input as FormInput, SubmitButton } from 'formik-antd';
import { Button, Typography } from 'antd';
import './modal_registration.less';
import { useSelector } from 'react-redux';
import { selectError } from '../../../store/login/selectors';
import * as Yup from 'yup';

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
    const error = useSelector(selectError);
    return (
        <Modal
            width={530}
            title={<Title style={error ? { color: 'red' } : {}} level={4}>{error ? 'Error' : 'Registration'}</Title>}
            visible={visible}
            onCancel={onCancel}
            footer={null}>
            <div className='modal__registration'>
                <Formik
                    initialValues={{ email: '', password: '', name: '' }}
                    validateOnBlur
                    validationSchema={RegistrationSchema}
                    onSubmit={async (values) => console.log(values)}>
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
                            <Button.Group><SubmitButton>Зарегистрироваться</SubmitButton></Button.Group>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    )
}

export default ModalRegistration