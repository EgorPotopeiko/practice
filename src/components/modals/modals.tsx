import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseModalAction } from '../../store/modals/actions';
import { selectCredentialsModal } from '../../store/modals/selectors';
import ModalAuth from './modal_auth';

const Modals: React.FC = () => {
    const dispatch = useDispatch();
    const modalParams = useSelector(selectCredentialsModal)
    if (!modalParams.isOpen) {
        return null
    }
    else {
        switch (modalParams.typeModal) {
            case "Auth":
                return (
                    <ModalAuth onCancel={() => dispatch(CloseModalAction())} visible={modalParams.isOpen} />
                )
            case "Registration":
                return (
                    <Modal onCancel={() => dispatch(CloseModalAction())} visible={modalParams.isOpen}>Registration</Modal>
                )
            default:
                return (
                    <></>
                )
        }
    }
}
export default Modals
