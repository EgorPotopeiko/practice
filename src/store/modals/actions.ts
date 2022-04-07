import { ModalsActionTypes } from './action-types';

export const OpenModalAction = (typeModal: string, data?: any) => ({
    type: ModalsActionTypes.OPEN_MODAL,
    typeModal,
    data
})
export const CloseModalAction = () => ({
    type: ModalsActionTypes.CLOSE_MODAL
})


