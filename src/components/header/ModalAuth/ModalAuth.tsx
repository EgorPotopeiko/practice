import { UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { Form, FormItem, Input as FormInput, SubmitButton } from 'formik-antd';
import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';

interface Props {
    modalAuthVisible: boolean,
    onOk: Function,
}

const ModalAuth: React.FC = ({ }) => {
    return (
        <Modal title="Authorization" footer={null}>
            {/* <Formik initialValues={{ email: '', password: '' }} validateOnBlur onSubmit={(values) => console.log(values)}>
                {() => (
                    <Form >
                        <FormItem name='email' validate={validateRequired}>
                            <FormInput
                                name='email'
                                required={true}
                                placeholder='Email'
                                onChange={(e) => dispatch(setEmail(e.target.value))}
                                prefix={<UserOutlined className="site-form-item-icon" />}
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
                        <Button.Group>
                            <SubmitButton loading={loading} onClick={handleOk}>Войти</SubmitButton>
                            <Button onClick={changeForm}>Регистрация</Button>
                        </Button.Group>
                    </Form>
                )}
            </Formik> */}
        </Modal>
    )
}

export default ModalAuth