import Modal from 'antd/lib/modal/Modal';
import { Button, Result } from 'antd';
import './modal_registration-success.less';
import { useDispatch, useSelector } from 'react-redux';
import { selectDataModal } from '../../../store/modals/selectors';
import { OpenModalAction } from '../../../store/modals/actions';
import { setError } from '../../../store/login/actions';

type Props = {
    visible: boolean,
    onCancel: () => void
}

const ModalRegistrationSuccess: React.FC<Props> = ({ visible, onCancel }) => {
    const data = useSelector(selectDataModal);
    const dispatch = useDispatch();
    return (
        <Modal
            width={530}
            visible={visible}
            onCancel={onCancel}
            footer={null}>
            <div className='modal__registration-success'>
                <Result
                    status="success"
                    title="Регистрация успешно завершена"
                    subTitle={`Ваше имя: ${data.name}. Ваша почта: ${data.email}`}
                    extra={[
                        <Button type="primary" key="console" onClick={() => {
                            dispatch(setError())
                            onCancel()
                            dispatch(OpenModalAction('Auth'))
                        }}>
                            Войти
                        </Button>
                    ]}
                />
            </div>
        </Modal>
    )
}

export default ModalRegistrationSuccess