import { TCategory } from '../../models/category';
import { CategoryActionTypes } from './action-types';

export const GetCategoriesStartAction = () => ({
    type: CategoryActionTypes.LOAD_CATEGORY_START
})
export const GetCategoriesSuccessAction = (data: Array<TCategory>) => ({
    type: CategoryActionTypes.LOAD_CATEGORY_SUCCESS,
    data
})
export const GetCategoriesErrorAction = (error: any) => ({
    type: CategoryActionTypes.LOAD_CATEGORY_ERROR,
    error
})
export const CreateCategoryStartAction = (title: string) => ({
    type: CategoryActionTypes.CREATE_CATEGORY_START,
    title
})
export const CreateCategorySuccessAction = (data: TCategory) => ({
    type: CategoryActionTypes.CREATE_CATEGORY_SUCCESS,
    data
})
export const CreateCategoryErrorAction = (error: any) => ({
    type: CategoryActionTypes.CREATE_CATEGORY_ERROR,
    error
})
export const DeleteCategoryAction = (id: number) => ({
    type: CategoryActionTypes.DELETE_CATEGORY,
    id
})
