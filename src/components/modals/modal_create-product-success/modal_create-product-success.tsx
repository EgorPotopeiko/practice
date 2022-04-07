import { Typography } from 'antd';
import { Form } from 'formik-antd';
import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import './modal_create-product-success.less';
import history from '../../../history';
import { USER_PATH } from '../../../routing/names';

interface Props {
    visible: boolean,
    onCancel: () => void
    // data: any
}

const { AUTH } = USER_PATH;

const { Text } = Typography;

const ModalCreateProductSuccess: React.FC<Props> = ({ visible, onCancel }) => {
    const backToMain = () => {
        onCancel()
        history.push(AUTH)
    }
    return (
        <Modal title="Ваш заказ успешно создан" onCancel={backToMain} visible={visible} footer={null}>
            <div className='success__modal'>
                <Form>
                    <Text>Номер вашего заказа: <b><i>{ }</i></b></Text>
                </Form>
            </div>
        </Modal>
    )
}

export default ModalCreateProductSuccess