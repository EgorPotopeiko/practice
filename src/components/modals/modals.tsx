import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseModalAction } from '../../store/modals/actions';
import { selectCredentialsModal } from '../../store/modals/selectors';
import ModalAuth from './modal_auth';
import ModalCreateProduct from './modal_create-product';

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
            case "CreateProduct":
                return (
                    <ModalCreateProduct onCancel={() => dispatch(CloseModalAction())} visible={modalParams.isOpen} />
                )
            default:
                return (
                    <></>
                )
        }
    }
}
export default Modals
