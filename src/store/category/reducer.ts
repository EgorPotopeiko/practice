/* eslint-disable array-callback-return */
import { InferValueTypes } from '../../models/common';
import * as actions from './actions'
import { ErrorActionState, StartActionState, SuccessActionState } from '../helpers';
import { CategoryActionTypes } from './action-types';

const initialState: TCategoryState = {
    listCategories: JSON.parse(localStorage.getItem("categories")!) || ["all", "mobile", "electron", "pc", "home", "sport"]
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TCategoryState = {
    listCategories: Array<string>
}

// const deleteCategory = (state: TCategoryState, id: string) => {
//     const categories = state.listCategories;
//     return categories.filter((category: TCategory) => category.id !== id)
// }

export default function categoryReducer(state: TCategoryState = initialState, action: ActionTypes): TCategoryState {
    switch (action.type) {
        case CategoryActionTypes.CREATE_CATEGORY_START:
            return StartActionState(state)
        case CategoryActionTypes.CREATE_CATEGORY_SUCCESS:
            return {
                ...SuccessActionState(state),
                listCategories: [...state.listCategories, action.data]
            }
        case CategoryActionTypes.CREATE_CATEGORY_ERROR:
            return ErrorActionState(state, action.error)
        // case CategoryActionTypes.DELETE_CATEGORY:
        //     return {
        //         ...state,
        //         listCategories: deleteCategory(state, action.id)
        //     }
        default:
            return state
    }
}
