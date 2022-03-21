import { UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { Form, FormItem, Input as FormInput, SubmitButton } from 'formik-antd';
import { Button } from 'antd';
import './ModalAuth.less';

interface Props {
    visible: boolean,
    onCancel: () => void
}

const ModalAuth: React.FC<Props> = ({ visible, onCancel }) => {
    return (
        <Modal width={530} title="Authorization" visible={visible} onCancel={onCancel} footer={null}>
            <div className='modal__auth'>
                <Formik initialValues={{ email: '', password: '' }} validateOnBlur onSubmit={(values) => console.log(values)}>
                    {() => (
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
                                <SubmitButton>Войти</SubmitButton>
                            </Button.Group>
                        </Form>
                    )}
                </Formik>
            </div>

        </Modal>
    )
}

export default ModalAuth