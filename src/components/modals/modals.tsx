import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetStatus } from '../../store/login/actions';
import { CloseModalAction } from '../../store/modals/actions';
import { selectCredentialsModal } from '../../store/modals/selectors';
import ModalAuth from './modal_auth';
import ModalCreateCategory from './modal_create-category';
import ModalCreateProduct from './modal_create-product';
import ModalRegistration from './modal_registration';

const Modals: React.FC = () => {
    const modalParams = useSelector(selectCredentialsModal);
    const dispatch = useDispatch();
    const closeActions = () => {
        dispatch(CloseModalAction())
        dispatch(SetStatus(''))
    }
    if (!modalParams.isOpen) return null
    else {
        switch (modalParams.typeModal) {
            case "Auth":
                return <ModalAuth onCancel={() => closeActions()} visible={modalParams.isOpen} />
            case "Registration":
                return <ModalRegistration onCancel={() => closeActions()} visible={modalParams.isOpen} />
            case "CreateProduct":
                return <ModalCreateProduct onCancel={() => closeActions()} visible={modalParams.isOpen} />
            case "CreateCategory":
                return <ModalCreateCategory onCancel={() => closeActions()} visible={modalParams.isOpen} />
            default:
                return null
        }
    }
}
export default Modals
