import { InferValueTypes } from '../../models/common';
import * as actions from './actions';
import { ModalsActionTypes } from './action-types';

const initialState: TModalsState = {
    isOpen: false,
    typeModal: null,
    data: null
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TModalsState = {
    isOpen: boolean,
    typeModal: string | null,
    data: any
}

export default function modalsReducer(state: TModalsState = initialState, action: ActionTypes): TModalsState {
    switch (action.type) {
        case ModalsActionTypes.OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                typeModal: action.typeModal,
                data: action.data
            }
        case ModalsActionTypes.CLOSE_MODAL:
            return {
                ...state,
                isOpen: false,
                data: null
            }
        default:
            return state
    }
}
