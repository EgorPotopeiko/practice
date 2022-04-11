import { CategoryActionTypes } from './action-types';

export const CreateCategoryStartAction = (title: any) => ({
    type: CategoryActionTypes.CREATE_CATEGORY_START,
    title
})
export const CreateCategorySuccessAction = (data: any) => ({
    type: CategoryActionTypes.CREATE_CATEGORY_SUCCESS,
    data
})
export const CreateCategoryErrorAction = (error: any) => ({
    type: CategoryActionTypes.CREATE_CATEGORY_ERROR,
    error
})
export const DeleteCategoryAction = (id: string) => ({
    type: CategoryActionTypes.DELETE_CATEGORY,
    id
})
