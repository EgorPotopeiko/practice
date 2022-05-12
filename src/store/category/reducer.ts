import { InferValueTypes } from '../../models/common';
import * as actions from './actions';
import { StartActionState, SuccessActionState } from '../helpers';
import { CategoryActionTypes } from './action-types';

const initialState: TCategoryState = {
    listCategories: [],
    error: null,
    isLoading: false
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TCategoryState = {
    listCategories: Array<any>
    error: any
    isLoading: boolean
}

export default function categoryReducer(state: TCategoryState = initialState, action: ActionTypes): TCategoryState {
    switch (action.type) {
        case CategoryActionTypes.LOAD_CATEGORY_START:
            return StartActionState(state)
        case CategoryActionTypes.LOAD_CATEGORY_SUCCESS:
            return {
                ...SuccessActionState(state),
                listCategories: action.data
            }
        case CategoryActionTypes.LOAD_CATEGORY_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case CategoryActionTypes.CREATE_CATEGORY_START:
            return StartActionState(state)
        case CategoryActionTypes.CREATE_CATEGORY_SUCCESS:
            return SuccessActionState(state)
        case CategoryActionTypes.CREATE_CATEGORY_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case CategoryActionTypes.DELETE_CATEGORY:
            return {
                ...state
            }
        default:
            return state
    }
}
