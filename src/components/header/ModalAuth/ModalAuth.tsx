import { UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { Form, FormItem, Input as FormInput, SubmitButton } from 'formik-antd';
import { Button } from 'antd';
import './ModalAuth.less';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginActionTypes } from '../../../store/login/action-types';
import { selectError } from '../../../store/login/selectors';

interface Props {
    visible: boolean,
    setErrorVisible: React.Dispatch<React.SetStateAction<boolean>>,
    onCancel: () => void
}

const validateEmail = (value: string) => {
    if (!value) {
        return "Required!";
    }
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return "Invalid email address!"
    }
}

const validatePassword = (value: string) => {
    if (!value) {
        return "Required!"
    }
}

const ModalAuth: React.FC<Props> = ({ visible, onCancel, setErrorVisible }) => {
    const dispatch = useDispatch()
    const error = useSelector(selectError)
    const [loading, setLoading] = useState(false);
    const load = async () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            if (error) {
                onCancel()
                setErrorVisible(true)
            }
            else {
                onCancel()
            }
        }, 3000)
    }
    return (
        <Modal width={530} title="Authorization" visible={visible} onCancel={onCancel} footer={null}>
            <div className='modal__auth'>
                <Formik initialValues={{ email: '', password: '' }} validateOnBlur onSubmit={async (values: any) =>
                    setTimeout(() => {
                        dispatch({
                            type: LoginActionTypes.LOAD_AUTHORIZATION_START,
                            email: values.email,
                            password: values.password
                        })
                    }, 3000)}>
                    {() => (
                        <Form >
                            <FormItem name='email' validate={validateEmail}>
                                <FormInput
                                    name='email'
                                    required={true}
                                    placeholder='Email'
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                />
                            </FormItem>
                            <FormItem name='password' validate={validatePassword}>
                                <FormInput.Password
                                    name='password'
                                    required={true}
                                    placeholder='Password'
                                />
                            </FormItem>
                            <Button.Group>
                                <SubmitButton loading={loading} onClick={load}>Войти</SubmitButton>
                            </Button.Group>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    )
}

export default ModalAuth