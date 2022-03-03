import { UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { Form, FormItem, Input as FormInput, SubmitButton } from 'formik-antd';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { checkEmail, checkPassword } from '../../../store/auth/actions';
import './ModalAuth.less';

interface Props {
    modalAuthVisible: boolean,
    onOk: () => void,
    loading: boolean,
    onCancel: () => void
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

const ModalAuth: React.FC<Props> = ({ modalAuthVisible, onOk, loading, onCancel }) => {
    const dispatch = useDispatch();
    return (
        <Modal title="Authorization" visible={modalAuthVisible} onOk={onOk} onCancel={onCancel} footer={null}>
            <Formik initialValues={{ email: '', password: '' }} validateOnBlur onSubmit={(values) => console.log(values)}>
                {() => (
                    <Form >
                        <FormItem name='email' validate={validateEmail}>
                            <FormInput
                                name='email'
                                required={true}
                                placeholder='Email'
                                onChange={(e) => dispatch(checkEmail(e.target.value))}
                                prefix={<UserOutlined className="site-form-item-icon" />}
                            />
                        </FormItem>
                        <FormItem name='password' validate={validatePassword}>
                            <FormInput.Password
                                name='password'
                                required={true}
                                placeholder='Password'
                                onChange={(e) => dispatch(checkPassword(e.target.value))}
                            />
                        </FormItem>
                        <Button.Group>
                            <SubmitButton loading={loading} onClick={onOk}>Войти</SubmitButton>
                        </Button.Group>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default ModalAuth