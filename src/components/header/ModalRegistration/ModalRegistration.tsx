import { UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { Form, FormItem, Input as FormInput } from 'formik-antd';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { setFirstName, setLastName, setEmail, setPassword } from '../../../store/registration/actions';
import './ModalRegistration.less';

interface Props {
    modalRegVisible: boolean,
    onOk: any,
}

const validateEmail = (value: string) => {
    if (!value) {
        return "Required!";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return "Invalid email address!";
    }
}

const validatePassword = (value: string) => {
    if (!value) {
        return "Required!";
    }
}

const ModalRegistration: React.FC<Props> = ({ modalRegVisible, onOk }) => {
    const dispatch = useDispatch();
    return (
        <Modal title="Authorization" visible={modalRegVisible} footer={null}>
            <Formik initialValues={{ first_name: '', last_name: '', email: '', password: '' }} validateOnBlur onSubmit={(values) => console.log(values)}>
                {() => (
                    <Form >
                        <FormItem name='first_name'>
                            <FormInput
                                name='first_name'
                                required={true}
                                placeholder='First Name'
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                onChange={(e) => dispatch(setFirstName(e.target.value))}
                            />
                        </FormItem>
                        <FormItem name='last_name'>
                            <FormInput
                                name='last_name'
                                required={true}
                                placeholder='Last Name'
                                onChange={(e) => dispatch(setLastName(e.target.value))}
                            />
                        </FormItem>
                        <FormItem name='email' validate={validateEmail}>
                            <FormInput
                                name='email'
                                required={true}
                                placeholder='Email'
                                onChange={(e) => dispatch(setEmail(e.target.value))}
                            />
                        </FormItem>
                        <FormItem name='password' validate={validatePassword}>
                            <FormInput.Password
                                name='password'
                                required={true}
                                placeholder='Password'
                                onChange={(e) => dispatch(setPassword(e.target.value))}
                            />
                        </FormItem>
                        <Button onClick={onOk}>Регистрация</Button>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default ModalRegistration