import Modal from 'antd/lib/modal/Modal';

interface Props {
    visible: boolean,
    onCancel: () => void
}

const ModalError: React.FC<Props> = ({ visible, onCancel }) => {
    return (
        <Modal width={530} title="Authorization" visible={visible} onCancel={onCancel} footer={null}>
            <div className='modal__error'>
                <h1>ERROR</h1>
            </div>
        </Modal>
    )
}

export default ModalError